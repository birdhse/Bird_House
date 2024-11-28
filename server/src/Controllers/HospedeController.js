import { createHospede, deleteHospede, readHospede, showOneHospede, updateHospede } from "../Models/HospedeModel.js";
import { hasProperty, isNullOrEmpty, verificaHospede } from "../validations/HospedeValidation.js";

export async function criarHospede(req, res) {
    //Ao ser chamado o criarAula controller virá no console
    console.log('HospedeController criarHospede');
    const hospede = req.body;

    //Exibindo corpo da requisição
    console.log(hospede);
    try {
        console.debug("Cadastrando hospede")
        const resposta = await createHospede(hospede);
        res.status(resposta[0]).json(resposta[1]);

    } catch (error) {
        console.debug(resposta)
        console > debug("Erro cadastrando hospede")
        res.satus(resposta[0]).json(resposta[1])
    }
}

export async function mostrarHospedes(req, res) {
    const [status, data] = await readHospede();  // Desestruture o retorno corretamente
    if (status === 200) {
        res.status(200).json(data);  // Retorna os hóspedes se tudo deu certo
    } else {
        res.status(status).json(data);  // Retorna o erro com o código de status
    }
}

export async function atualizarHospede(req, res) {

    console.log('HospedeController atualizarHospede');

    //Criando constante com a requisição
    const hospede = req.body;
    const { id_hospede } = req.params;

    if (verificaHospede(hospede) || isNullOrEmpty(id_hospede)) {
        res.status(400).json({ menssage: 'Todas as propriedades devem ser preenchidas' });
    }
    else {
        //Tentando atualizar hospede
        try {
            const [status, resposta] = await updateHospede(hospede, id_hospede);
            res.status(status).json(resposta)
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

export async function excluirHospede(req, res) {
    console.log('HospedeController excluirHospede');

    const { id_hospede } = req.params;

    // if (verificaHospede(id_hospede)) {
    //     res.status(400).json({ menssage: 'O id deve ser informado' });
    // }
    // else {
        try {
            const [status, resposta] = await deleteHospede(id_hospede);
            res.status(status).json(resposta);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    
}

export async function mostrarUmHospede(req, res) {
    console.log('HospedeController mostrarUmHospede');

    const { id_hospede } = req.params;


    try {
        const [status, resposta] = await showOneHospede(id_hospede);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}