import mysql from "mysql2/promise"
import db from "../conexao.js";
const conexao = mysql.createPool(db);

export async function createUsuario(usuarios) {

    console.log('Entrando no Model Usuario');

    const sql = `INSERT INTO usuarios(
        nome_usuario,
        email_usuario,
        login_usuario,
        senha,
        id_cargo)
    VALUES (?,?,?,?,?);`;

    const params = [
        usuarios.nome_usuario,
        usuarios.email_usuario,
        usuarios.login_usuario,
        usuarios.senha,
        usuarios.id_cargo
    ]


    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Usuario cadastrado');
        return [201, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function readUsuario(usuarios) {

    //Ao ser acionado o metodo createAula retorna na tela
    console.log('Entrando no Model Usuario');

    //Criando aula
    const sql = `SELECT * FROM usuarios`;

    const params = [
        usuarios.nome_usuario,
        usuarios.email_usuario,
        usuarios.login_usuario,
        usuarios.senha,
        usuarios.id_cargo
    ]

    //Executando query no banco
    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Usuario exibido');
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [400, error];
    }

}

export async function updateUsuario(usuarios, id_usuario) {
    //Criando conexão para o banco de dados usando configurações do db

    console.log('Entrando no Model Usuario');

    //Criando String com comandos sql
    const sql = `UPDATE usuarios SET
    nome_usuario = ?,
    email_usuario = ?,
    login_usuario = ?,
    senha = ?,
    id_cargo = ?
    WHERE id_usuario = ?
    `
    //Definindo parametros para inserir no sql
    const params = [
        usuarios.nome_usuario,
        usuarios.email_usuario,
        usuarios.login_usuario,
        usuarios.senha,
        usuarios.id_cargo,
        id_usuario
    ];

    //Executando query no banco
    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Atualizando Usuario');
        if (retorno.affectedRows < 1) {
            return [404, { message: 'Usuario não encontrado' }];
        }
        return [200, { menssage: 'Usuario atualizado' }];
    } catch (error) {
        console.log(error);
        return [500, error]
    }
}

export async function deleteUsuario(id_usuario) {

    console.log('Deletando no Model Usuario');
    const sql = `UPDATE usuarios SET ativo = ? WHERE id_usuario=?`;
    const params = [
        0,
        id_usuario
    ]

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Inativando Usuario');
        if (retorno.affectedRows < 1) {
            return [404, { message: 'Usuario não encontrado' }];
        }
        return [200, { menssage: 'Usuario inativado' }];

    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function showOneUsuario(id_usuario) {

    console.log('Mostrando um Usuario no Model Usuario');
    const sql = `SELECT * FROM usuarios WHERE id_usuario =?`;
    const params = [id_usuario];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Mostrando Usuario');
        return [200, retorno[0]];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function findUserByLoginPassword(login_usuario,senha) {
    console.log('UsuarioModel :: findUserByLoginPassword');

    
    const conexao = mysql.createPool(db);
    const sql = 'SELECT id_usuario FROM usuarios WHERE login_usuario = ? AND senha = ?';
    const params = [login_usuario,senha];

    try {
        const [retorno] = await conexao.query(sql,params);
        if (retorno.length < 1) {
            return [404, {message: 'Usuário ou senha inválidos'}];
            
        } else {
            return [200,retorno[0]];
            
        }
        
    } catch (error) {
        console.log(error);
        return [500, {message: 'Erro ao mostrar usuário'}]
        
    }
}

export async function showTableUsuarios() {

    console.log('Entrando no Model showTableUsuarios');
    const sql = `SELECT * FROM tabelausuarios;`;

    try {
        const [retorno] = await conexao.query(sql);
        console.log('Tabela Usuarios exibida');
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [502, error];
    }    
}