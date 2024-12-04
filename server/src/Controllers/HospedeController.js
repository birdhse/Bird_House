import { createHospede, deleteHospede, readHospede, showOneHospede, updateHospede } from "../Models/HospedeModel.js";
import { hasProperty, isNullOrEmpty, verificaHospede, verificaTelefHosp, verificaEmailHosp, verificarDataNascimentoHosp, verificaCPF } from "../validations/HospedeValidation.js";

export async function criarHospede(req, res) {
    console.log('HospedeController criarHospede');
    const hospede = req.body;

    console.log(hospede);

    // Validação dos dados do hóspede
    if (verificaHospede(hospede)) {
        console.log("propriedades");
        return res.status(400).json({ message: 'Todas as propriedades devem ser preenchidas corretamente.' });
    }
    if (isNullOrEmpty(hospede.nome_hospede)) {
        console.log("nome");
        return res.status(400).json({ message: 'Nome do hóspede é obrigatório.' });
    }
    if (!verificaTelefHosp(hospede.num_celular)) {
        console.log("celular");
        return res.status(400).json({ message: 'Número de celular inválido.' });
    }
    if (!verificaEmailHosp(hospede.email_hospede)) {
        console.log("email");
        return res.status(400).json({ message: 'Email inválido.' });
    }
    if (!verificarDataNascimentoHosp(hospede.data_nascimento)) {
        console.log("nascimento");
        return res.status(400).json({ message: 'Data de nascimento inválida ou idade fora do permitido.' });
    }
    if (!verificaCPF(hospede.cpf_hospede)) {
        console.log("cpf");
        return res.status(400).json({ message: 'CPF inválido.' });
    }

    try {
        console.debug("Cadastrando hospede");
        const resposta = await createHospede(hospede);
        res.status(resposta[0]).json(resposta[1]);
    } catch (error) {
        console.debug("Erro cadastrando hospede");
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar hóspede.', error: error.message });
    }
}

export async function mostrarHospedes(req, res) {
    const [status, data] = await readHospede(); // Desestruture o retorno corretamente
    if (status === 200) {
        res.status(200).json(data);  // Retorna os hóspedes se tudo deu certo
    } else {
        res.status(status).json(data);  // Retorna o erro com o código de status
    }
}

export async function atualizarHospede(req, res) {
    console.log('HospedeController atualizarHospede');
    const hospede = req.body;
    const { id_hospede } = req.params;

    // Validação dos dados antes de atualizar
    if (verificaHospede(hospede) || isNullOrEmpty(id_hospede)) {
        console.log("propriedades");
        return res.status(400).json({ message: 'Todas as propriedades devem ser preenchidas corretamente.' });
    }
    if (isNullOrEmpty(hospede.nome_hospede)) {
        console.log("nome");
        return res.status(400).json({ message: 'Nome do hóspede é obrigatório.' });
    }
    if (!verificaTelefHosp(hospede.num_celular)) {
        console.log("celular");
        return res.status(400).json({ message: 'Número de celular inválido.' });
    }
    if (!verificaEmailHosp(hospede.email_hospede)) {
        console.log("email");
        return res.status(400).json({ message: 'Email inválido.' });
    }
    if (!verificarDataNascimentoHosp(hospede.data_nascimento)) {
        console.log("nascimento");
        return res.status(400).json({ message: 'Data de nascimento inválida ou idade fora do permitido.' });
    }
    if (!verificaCPF(hospede.cpf_hospede)) {
        console.log("cpf");
        return res.status(400).json({ message: 'CPF inválido.' });
    }


    try {
        const [status, resposta] = await updateHospede(hospede, id_hospede);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao atualizar hóspede.', error: error.message });
    }
}

export async function excluirHospede(req, res) {
    console.log('HospedeController excluirHospede');
    const { id_hospede } = req.params;

    // Validação do ID do hóspede antes de excluir
    if (isNullOrEmpty(id_hospede)) {
        return res.status(400).json({ message: 'ID do hóspede é obrigatório.' });
    }

    try {
        const [status, resposta] = await deleteHospede(id_hospede);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao excluir hóspede.', error: error.message });
    }
}

export async function mostrarUmHospede(req, res) {
    console.log('HospedeController mostrarUmHospede');
    const { id_hospede } = req.params;

    // Validação do ID do hóspede antes de buscar
    if (isNullOrEmpty(id_hospede)) {
        return res.status(400).json({ message: 'ID do hóspede é obrigatório.' });
    }

    try {
        const [status, resposta] = await showOneHospede(id_hospede);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao buscar hóspede.', error: error.message });
    }
}
