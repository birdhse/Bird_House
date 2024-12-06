import { updateConfigUsuario } from "../Models/ConfigUsuModel.js";

import { verificaUsuario } from "../validations/ConfigUsuarioValidation.js";


export async function atualizarUmUsuario(req, res) {

    console.log('ConfigUsuarioController atualizarUmUsuario');

    //Criando constante com a requisição
    const usuario = req.body;
    const { id_usuario } = req.params;

    try {
        const [status, resposta] = await updateConfigUsuario(usuario, id_usuario);
        res.status(status).json(resposta)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

