import mysql from "mysql2"
import db from "../conexao.js";

export async function createHospede(hospedes) {
    const conexao = mysql.createPool(db);
    console.log('Entrando no Model Hospede');

    const sql = `INSERT INTO hospedes(
    nome_hospede, 
    num_celular, 
    email_hospede, 
    data_nascimento, 
    cpf_hospede)
    VALUES (?,?,?,?,?);`;

    const params = [
        hospedes.nome_hospede,
        hospedes.num_celular,
        hospedes.email_hospede,
        hospedes.data_nascimento,
        hospedes.cpf_hospede
    ]

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Hospede cadastrado');
        return [201, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

// export async function readHospede(hospedes) {
//     const conexao = mysql.createPool(db);

//     //Ao ser acionado o metodo createAula retorna na tela
//     console.log('Entrando no Model Hospede');

//     //Criando aula
//     const sql = `SELECT * FROM hospedes`;

//     const params = [
//         hospedes.nome_hospede,
//         hospedes.num_celular,
//         hospedes.email_hospede,
//         hospedes.data_nascimento,
//         hospedes.cpf_hospede
//     ]

//     //Executando query no banco
//     try {
//         const [retorno] = await conexao.query(sql, params);
//         console.log('Hospede exibido');
//         return [200, retorno];
//     } catch (error) {
//         console.log(error);
//         return [400, error];
//     }

// }

export async function readHospede() {
    const conexao = mysql.createPool(db);
    console.log('Entrando no Model Hospede');

    const sql = `SELECT * FROM hospedes`;

    try {
        // Usando promise() para que query retorne uma Promise
        const [retorno] = await conexao.promise().query(sql);
        console.log('Hospedes exibidos');
        return [200, retorno];  // Retorna o status 200 e os resultados da consulta
    } catch (error) {
        console.log(error);
        return [500, error];  // Em caso de erro, retorna 500
    }
}

export async function updateHospede(hospedes, id_hospede) {
    //Criando conexão para o banco de dados usando configurações do db
    const conexao = mysql.createPool(db);

    //Ao ser acionado o metodo createAula retorna na tela
    console.log('Entrando no Model Hospede');

    //Criando String com comandos sql
    const sql = `UPDATE hospedes SET nome_hospede = ?,
    num_celular = ?,
    email_hospede = ?,
    data_nascimento = ?,
    cpf_hospede = ?
    WHERE id_hospede = ?
    `
    //Definindo parametros para inserir no sql
    const params = [
        hospedes.nome_hospede,
        hospedes.num_celular,
        hospedes.email_hospede,
        hospedes.data_nascimento,
        hospedes.cpf_hospede,
        id_hospede
    ];

    //Executando query no banco
    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Atualizando Hospede');
        if (retorno.affectedRows < 1) {
            return [404, { message: 'Hospede não encontrado' }];
        }
        return [200, { menssage: 'Hospede atualizado' }];
    } catch (error) {
        console.log(error);
        return [500, error]
    }
}

export async function deleteHospede(id_hospede) {
    const conexao = mysql.createPool(db);

    console.log('Deletando no Model Hospede');
    const sql = `DELETE FROM  hospedes WHERE id_hospede =?`;

    const params = [id_hospede];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Deletando Hospede');
        if (retorno.affectedRows < 1) {
            return [404, { message: 'Hospede não encontrado' }];
        }
        return [200, { menssage: 'Hospede deletado' }];

    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function showOneHospede(id_hospede) {
    const conexao = mysql.createPool(db);

    console.log('Mostrando um Hospede no Model Hospede');
    const sql = `SELECT * FROM  hospedes WHERE id_hospede =?`;
    const params = [id_hospede];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Mostrando hospede');
        return [200, retorno[0]];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}
