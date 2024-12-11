import mysql from "mysql2/promise";
import db from "../conexao.js";
import { isNullOrEmpty } from "../validations/ReservaValidation.js";
import { verificaMudaStatus } from "./AcomocacoesModel.js";
const conexao = mysql.createPool(db);

export async function readReserva() {
    console.log('Entrando no Model Reserva');
    const sql = `SELECT * FROM reservas`;

    try {
        const [retorno] = await conexao.query(sql);
        console.log('Reserva exibida');
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [502, error];
    }

}

export async function createReserva(reserva) {
    console.log('Criando no Model Reserva');

    const [consulta] = await conexao.query('SELECT id_hospede FROM hospedes WHERE nome_hospede = ?', reserva.id_hospede);
    reserva.id_hospede = consulta[0].id_hospede;
    if(isNullOrEmpty(reserva.id_hospede)){
        console.log('Hospede não encontrado');
        return [500, error];
    }
    console.log(reserva);

    const checagemDatas = `
        SELECT * FROM reservas WHERE ((checkin BETWEEN ? AND ?) 
            OR (checkout BETWEEN ? AND ?) 
            OR (? BETWEEN checkin AND checkout))
            AND ((id_acomodacao = ? OR id_hospede = ?)
            AND ativo = 1); 
    `;
    
    const [reservasExistentes] = await conexao.query(checagemDatas, [ 
        reserva.checkin, 
        reserva.checkout, 
        reserva.checkin, 
        reserva.checkout, 
        reserva.checkin,
        reserva.id_acomodacao,
        reserva.id_hospede
    ]);
    console.log(reservasExistentes.length);
    console.log(reservasExistentes);
    if (reservasExistentes.length > 0) {
        console.log('Já existe uma reserva para o hóspede ou acomodação nas mesmas datas');
        return [400, { message: 'Já existe uma reserva para o hóspede ou acomodação nas mesmas datas' }];
    }

    
    const checagemLotacao = `SELECT lotacao FROM acomodacoes WHERE id_acomodacao = ?`;
    const parametros = [reserva.id_acomodacao];
    const [resposta] = await conexao.query(checagemLotacao, parametros);
    const lotacao = resposta[0].lotacao;
    if(reserva.qntd_hospedes > lotacao){
        console.log('superou limite de lotacao');
        return [400, { message: 'superou limite de lotacao' }];
    }

    const checaEstado =  `SELECT id_status_acomodacao FROM acomodacoes WHERE id_acomodacao = ?`;
    const parametros2 = [reserva.id_acomodacao];
    const [resposta2] = await conexao.query(checaEstado, parametros2);
    if(resposta2[0].id_status_acomodacao != 3){
        console.log('acomodacao não disponivel');
        return [400, { message: 'acomodacao não disponivel' }];
    }
    
    const sql = `INSERT INTO reservas (
    checkin,
    checkout,
    qntd_hospedes,
    id_status_reserva,
    id_hospede,
    id_acomodacao,
    observacao)
    VALUES (?,?,?,?,?,?,?)`;

    
    const params = [
        reserva.checkin,
        reserva.checkout,
        reserva.qntd_hospedes,
        reserva.id_status_reserva,
        reserva.id_hospede,
        reserva.id_acomodacao,
        reserva.observacao
    ];

    const desconto = reserva.valor_total;

    try {
        const [retorno] = await conexao.query(sql, params);
        const id_reserva = retorno.insertId;
        console.log('Reserva cadastrada');
        calculoDias(reserva, id_reserva);
        calculoValor(reserva, id_reserva, desconto);
        verificaMudaStatus(reserva.id_acomodacao,reserva.id_status_reserva);
        return [201, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }

}

export async function calculoDias(reserva, id_reserva) {
    console.log('Terminando de criar no Model Reserva');

    const sql = `UPDATE reservas SET num_dias=? WHERE id_reserva=?`;
    const diferencaMs = new Date(reserva.checkout) - new Date(reserva.checkin);
    const num_dias = diferencaMs / (1000 * 60 * 60 * 24);

    const params = [
        num_dias,
        id_reserva
    ]

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Calculos de dias concluidos');
        return [201, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function calculoValor(reserva, id_reserva, desconto) {
    const diferencaMs = new Date(reserva.checkout) - new Date(reserva.checkin);
    const num_dias = diferencaMs / (1000 * 60 * 60 * 24);

    console.log('Terminando de criar no Model Reserva');

    const [consulta] = await conexao.query('SELECT valor_diaria FROM acomodacoes WHERE id_acomodacao = ?', reserva.id_acomodacao);
    const valor_total = (consulta[0].valor_diaria * num_dias) - desconto;

    const sql = `UPDATE reservas SET valor_total=? WHERE id_reserva=?`;
    const params = [
        valor_total,
        id_reserva
    ]

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Calculos de preço concluidos');
        return [201, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function updateReserva(reserva, id_reserva) {
    console.log('Atualizando no Model Reserva');
    const [consulta] = await conexao.query('SELECT id_hospede FROM hospedes WHERE nome_hospede = ?', reserva.id_hospede);
    reserva.id_hospede = consulta[0].id_hospede;
    
    if(isNullOrEmpty(reserva.id_hospede)){
        console.log('Hospede não encontrado');
        return [500, error];
    }

    const dataIn = reserva.checkin;
    reserva.checkin = dataIn.split('T')[0];

    const dataOut = reserva.checkout;
    reserva.checkout = dataOut.split('T')[0];

    console.log(reserva);

    const checagemDatas = `
        SELECT * FROM reservas
        WHERE ((checkin BETWEEN ? AND ?) 
            OR (checkout BETWEEN ? AND ?) 
            OR (? BETWEEN checkin AND checkout))
            AND ((id_acomodacao = ? OR id_hospede = ?)
            AND ((ativo = 1) AND (id_reserva != ?))); 
    `;
    
    const [reservasExistentes] = await conexao.query(checagemDatas, [
        reserva.checkin, 
        reserva.checkout, 
        reserva.checkin, 
        reserva.checkout, 
        reserva.checkin,
        reserva.id_acomodacao,
        reserva.id_hospede,
        reserva.id_reserva
    ]);

    if (reservasExistentes.length > 0) {
        console.log('Já existe uma reserva para o hóspede ou acomodação nas mesmas datas');
        return [400, { message: 'Já existe uma reserva para o hóspede ou acomodação nas mesmas datas' }];
    }

    const checagemLotacao = `SELECT lotacao FROM acomodacoes WHERE id_acomodacao = ?`;
    const parametros = [reserva.id_acomodacao];
    const [resposta] = await conexao.query(checagemLotacao, parametros);
    const lotacao = resposta[0].lotacao;
    if(reserva.qntd_hospedes > lotacao){
        console.log('superou limite de lotacao');
        return [400, { message: 'superou limite de lotacao' }];
    }

    // const checaEstado =  `SELECT id_status_acomodacao FROM acomodacoes WHERE id_acomodacao = ?`;
    // const parametros2= [reserva.id_acomodacao];
    // const [resposta2] = await conexao.query(checaEstado, parametros2);
    // if(resposta2 != 3){
    //     console.log('acomodacao não disponivel');
    //     return [400, { message: 'acomodacao não disponivel' }];
    // }
    
    //Criando aula
    const sql = `UPDATE reservas SET
    id_hospede =?,
    id_acomodacao =?,
    checkin =?,
    checkout =?,
    qntd_hospedes =?,
    valor_total=?,
    id_status_reserva =?,
    observacao =?
    where id_reserva = ?`
    //Definindo parametros para inserir no sql
    const params = [
        reserva.id_hospede,
        reserva.id_acomodacao,
        reserva.checkin,
        reserva.checkout,
        reserva.qntd_hospedes,
        reserva.valor_total,
        reserva.id_status_reserva,
        reserva.observacao,
        id_reserva
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Atualizando reserva');
        if (retorno.affectedRows < 1) {
            return [404, { mensagem: 'Reserva não encontrada' }];
        }
        calculoDias(reserva, id_reserva, 0);
        verificaMudaStatus(reserva.id_acomodacao,reserva.id_status_reserva);
        return [200, { mensagem: 'Reserva Atualizada' }];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function deleteReserva(id_reserva) {
    console.log('Deletando no Model Reserva');
    const sql = `UPDATE reservas SET ativo = ? WHERE id_reserva=?`;
    const params = [
        0,
        id_reserva
    ]
    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Deletando reserva');
        if (retorno.affectedRows < 1) {
            return [404, { mensagem: 'Reserva não encontrada' }];
        }
        return [200, { mensagem: 'Reserva Deletada' }];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function showOneReserva(id_reserva) {
    console.log('Mostrando uma Reserva no Model Reserva');
    const sql = `SELECT * FROM  umareserva WHERE id_reserva=?`;
    const params = [id_reserva];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Mostrando uma Reserva');
        return [200, retorno[0]];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function showTableReservas() {
    console.log('Entrando no Model Reserva');
    const sql = `SELECT * FROM tabelareservas;`;

    try {
        const [retorno] = await conexao.query(sql);
        console.log('Tabela Reservas exibida');
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [502, error];
    }    
}