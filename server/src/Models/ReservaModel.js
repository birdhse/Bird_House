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
        reserva.id_status,
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

    //Criando aula
    const sql = `INSERT INTO reservas (
    id_status,
    id_hospede,
    id_acomodacao,
    checkin,
    checkout,
    qntd_hospedes,
    valor_total,
    observacao)
    VALUES (?,?,?,?,?,?,?,?)`;

    //Definindo parametros para inserir no sql
    const params = [
        reserva.id_hospede,
        reserva.id_acomodacao,
        reserva.id_status,
        reserva.checkin,
        reserva.checkout,
        reserva.qntd_hospedes,
        reserva.valor_total,
        reserva.observacao
    ];
    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Reserva cadastrada');
        return [201, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function updateReserva(reserva) {
    //Criando conexão para o banco de dados usando configurações de 'db'
    const conexao = mysql.createPool(db);

    //Ao ser acionado o metodo createAula retorna na tela
    console.log('Criando no Model Reserva');

    //Criando aula
    const sql = `UPDATE reservas SET id_status =?,
    id_hospede =?,
    id_acomodacao=?,
    checkin=?,
    checkout=?,
    qntd_hospedes=?,
    valor_total=?,
    observacao=?
    where id_reserva = ?`

    //Definindo parametros para inserir no sql
    const params = [
        reserva.id_hospede,
        reserva.id_acomodacao,
        reserva.id_status,
        reserva.checkin,
        reserva.checkout,
        reserva.qntd_hospedes,
        reserva.valor_total,
        reserva.observacao
    ];
    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Atualizando reserva');
        if (retorno.affectedRows < 1) {
            return [404, { mensagem: 'Reserva não encontrada' }];
        }
            return [200,{mensagem:'Reserva Atualizada'}];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}



export async function deleteReserva(id) {
    const conexao = mysql.createPool(db);

    console.log('Deletando no Model Reserva');
    const sql = `DELETE FROM  reservas WHERE id=?`;
    const params = [id];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Deletando reserva');
        if (retorno.affectedRows < 1) {
            return [404, { mensagem: 'Reserva não encontrada' }];
        }
        return [200,{mensagem:'Reserva Deletada'}];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function showOneReserva(id) {
    const conexao = mysql.createPool(db);

    console.log('Mostrando uma Reserva no Model Reserva');
    const sql = `SELECT * FROM  reservas WHERE id=?`;
    const params = [id];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Mostrando uma Reserva');
        return [200, retorno[0]];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}