import mysql from "mysql2/promise";
import db from "../conexao.js";

export async function readReserva(reserva) {
    const conexao = mysql.createPool(db);

    //Ao ser acionado o metodo createAula retorna na tela
    console.log('Entrando no Model Reserva');

    //Criando aula
    const sql = `SELECT * FROM reservas`;

    //Definindo parametros para inserir no sql
    const params = [
        reserva.id_hospede,
        reserva.id_acomodacao,
        reserva.id_status_reserva,
        reserva.checkin,
        reserva.checkout,
        reserva.qntd_hospedes,
        reserva.valor_total,
        reserva.observacao
    ];

    //Executando query no banco
    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Reserva exibida');
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [502, error];
    }

}

export async function createReserva(reserva) {
    //Criando conexão para o banco de dados usando configurações de 'db'
    const conexao = mysql.createPool(db);

    //Ao ser acionado o metodo createAula retorna na tela
    console.log('Criando no Model Reserva');

    const desconto = reserva.valor_total;


    //Criando aula
    const sql = `INSERT INTO reservas (
    checkin,
    checkout,
    qntd_hospedes,
    id_status_reserva,
    id_hospede,
    id_acomodacao,
    observacao)
    VALUES (?,?,?,?,?,?,?)`;

    //Definindo parametros para inserir no sql
    const params = [
        reserva.checkin,
        reserva.checkout,
        reserva.qntd_hospedes,
        reserva.id_status_reserva,
        reserva.id_hospede,
        reserva.id_acomodacao,
        reserva.observacao
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        const id_reserva = retorno.insertId;
        console.log('Reserva cadastrada');
        calculoDias(reserva, id_reserva);
        calculoValor(reserva, id_reserva, desconto);
        return [201, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }

}


export async function calculoDias(reserva, id_reserva) {
    const conexao = mysql.createPool(db);
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
        console.log('Dias cadastrados');
        return [201, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function calculoValor(reserva, id_reserva, desconto) {
    const diferencaMs = new Date(reserva.checkout) - new Date(reserva.checkin);
    const num_dias = diferencaMs / (1000 * 60 * 60 * 24);

    const conexao = mysql.createPool(db);
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
        console.log('Calculos cadastrados');
        return [201, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function updateReserva(reserva,id_reserva) {
    //Criando conexão para o banco de dados usando configurações de 'db'
    const conexao = mysql.createPool(db);

    //Ao ser acionado o metodo createAula retorna na tela
    console.log('Atualizando no Model Reserva');

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
        return [200, { mensagem: 'Reserva Atualizada' }];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}



export async function deleteReserva(id_reserva) {
    const conexao = mysql.createPool(db);

    console.log('Deletando no Model Reserva');
    const sql = `DELETE FROM  reservas WHERE id_reserva=?`;
    const params = [id_reserva];

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
    const conexao = mysql.createPool(db);

    console.log('Mostrando uma Reserva no Model Reserva');
    const sql = `SELECT * FROM  reservas WHERE id_reserva=?`;
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