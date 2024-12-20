import { showTableUsuarios, createUsuario, deleteUsuario, readUsuario, showOneUsuario, updateUsuario, findUserByLoginPassword} from "../Models/UsuarioModel.js";
import { hasProperty, isNullOrEmpty,verificaUsuario } from "../validations/UsuarioValidation.js";

export async function mostrarTabelaUsuarios(req, res) {
    console.log('ReservaController mostrarTabelaUsuarios');
    const usuario = req.body;

    console.log(usuario);

    try {
        const [status, resposta] = await showTableUsuarios(usuario);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function criarUsuario(req, res) {

    console.log('UsuarioController criarUsuario');
    const usuario = req.body;

    //Exibindo corpo da requisição
    console.log(usuario);
    try {
        console.debug("Cadastrando Usuario")
        const resposta = await createUsuario(usuario);
        res.status(resposta[0]).json(resposta[1]);

    } catch (error) {
        console.debug(resposta)
        console > debug("Erro cadastrando usuario")
        res.satus(resposta[0]).json(resposta[1])
    }
}

export async function logarUsuario(req,res) {
    console.log('UsuarioController :: logarUsuario');
    const {login_usuario,senha} = req.body;

    if (!login_usuario || !senha) {
        res.status(400).json({message:'Usuário e senha são obrigatórios'})
        
    } else {
        try {
            const [status,resposta] = await findUserByLoginPassword(login_usuario,senha);
            res.status(status).json(resposta);
        } catch (error) {
            res.status(500).json({message:'Erro ao efetuar login'})
            
        }
        
    }
}

export async function mostrarUsuarios(req, res) {
    console.log('UsuarioController mostrarUsuario');
    const usuario = req.body;

    //Exibindo corpo da requisição
    console.log(usuario);

    try {
        const [status, resposta] = await readUsuario(usuario);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function atualizarUsuario(req, res) {

    console.log('UsuarioController atualizarUsuario');

    //Criando constante com a requisição
    const usuario = req.body;
    const { id_usuario } = req.params;

   if (verificaUsuario(usuario) || isNullOrEmpty(id_usuario)) {
        res.status(400).json({ menssage: 'Todas as propriedades devem ser preenchidas' });
    }
    else {
        //Tentando atualizar 
        try {
            const [status, resposta] = await updateUsuario(usuario, id_usuario);
            res.status(status).json(resposta)
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

}

export async function excluirUsuario(req, res) {
    console.log('UsuarioController excluirUsuario');

    const { id_usuario } = req.params;

    if (isNullOrEmpty(id_usuario)) {
        res.status(400).json({ menssage: 'O id deve ser informado' });
    }
    else {
        try {
            const [status, resposta] = await deleteUsuario(id_usuario);
            res.status(status).json(resposta);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }


}

export async function mostrarUmUsuario(req, res) {
    console.log('UsuarioController mostrarUmUsuario');

    const { id_usuario} = req.params;

    try {
        const [status, resposta] = await showOneUsuario(id_usuario);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}