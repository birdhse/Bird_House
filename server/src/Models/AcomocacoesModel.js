import mysql from "mysql2/promise";
import db from "../conexao.js";
const conexao = mysql.createPool(db);

export async function readInfo() {
    console.log('Entrando no Model Acomodacoes');
    //Criando aula
    const sql = `SELECT * FROM tabelageral`;
    //Executando query no banco
    try {
        const [retorno] = await conexao.query(sql);
        console.log('Acomodacoes exibido');
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [400, error];
    }
}


export async function statusPendente(id_acomodacao) {
    console.log('Atualizando no Model Acomodacoes');
    //Criando aula
    const sql = `UPDATE acomodacoes SET id_status_acomodacao =? where id_acomodacao = ?`
    //Definindo parametros para inserir no sql
    const params = [
        1,
        id_acomodacao
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log(retorno, 'status atualizado: Pendente');
        return [200, { mensagem: 'status atualizado: Pendente' }];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function statusIndisponivel(id_acomodacao) {
    console.log('Atualizando no Model Acomodacoes');
    //Criando aula
    const sql = `UPDATE acomodacoes SET id_status_acomodacao =? where id_acomodacao = ?`
    //Definindo parametros para inserir no sql
    const params = [
        2,
        id_acomodacao
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log(retorno, 'status atualizado: Indisponivel');
        return [200, { mensagem: 'status atualizado: Indisponivel' }];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function statusEmLimpeza(id_acomodacao) {
    console.log('Atualizando no Model Acomodacoes');
    //Criando aula
    const sql = `UPDATE acomodacoes SET id_status_acomodacao =? where id_acomodacao = ?`
    //Definindo parametros para inserir no sql
    const params = [
        3,
        id_acomodacao
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log(retorno, 'status atualizado: EmLimpeza');
        return [200, { mensagem: 'status atualizado: EmLimpeza' }];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function statusManutencao(id_acomodacao) {
    console.log('Atualizando no Model Acomodacoes');
    //Criando aula
    const sql = `UPDATE acomodacoes SET id_status_acomodacao =? where id_acomodacao = ?`
    //Definindo parametros para inserir no sql
    const params = [
        4,
        id_acomodacao
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log(retorno, 'status atualizado: Manutencao');
        return [200, { mensagem: 'status atualizado: Manutencao' }];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function statusDisponivel(id_acomodacao) {
    console.log('Atualizando no Model Acomodacoes');
    //Criando aula
    const sql = `UPDATE acomodacoes SET id_status_acomodacao =? where id_acomodacao = ?`
    //Definindo parametros para inserir no sql
    const params = [
        5,
        id_acomodacao
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log(retorno, 'status atualizado: Disponivel');
        return [200, { mensagem: 'status atualizado: Disponivel' }];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}