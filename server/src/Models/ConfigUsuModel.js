import mysql from "mysql2/promise";
import db from "../conexao.js";

const conexao = mysql.createPool(db);


export async function updateConfigUsuario(usuarios, id_usuario) {
    console.log('Entrando no Model ConfiUsuario');

    //Criando String com comandos sql
    const sql = `UPDATE usuarios SET
    email_usuario = ?,
    senha = ?
    WHERE id_usuario = ?
    `
    //Definindo parametros para inserir no sql
    const params = [
        usuarios.email_usuario,
        usuarios.senha,
        id_usuario
    ];

    //Executando query no banco
    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Atualizando um Usuario');
        if (retorno.affectedRows < 1) {
            return [404, { message: 'Usuario não encontrado' }];
        }
        return [200, { menssage: 'Um usuario atualizado' }];
    } catch (error) {
        console.log(error);
        return [500, error]
    }
}

