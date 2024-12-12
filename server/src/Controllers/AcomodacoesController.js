import { readInfo, readAcomodacoes, readSuite, readChale, readCabana, readDomo, readBus, readEstacionamento } from "../Models/AcomocacoesModel.js";
import { statusDisponivel, statusEmLimpeza, statusIndisponivel, statusManutencao, statusPendente } from "../Models/AcomocacoesModel.js";



export async function mostrarInfos(req, res) {
    const [status, data] = await readInfo(); // Desestruture o retorno corretamente
    if (status === 200) {
        res.status(200).json(data);  // Retorna os hóspedes se tudo deu certo
    } else {
        res.status(status).json(data);  // Retorna o erro com o código de status
    }
}

export async function mostrarAcomodacoes(req, res) {
    const [status, data] = await readAcomodacoes(); // Desestruture o retorno corretamente
    if (status === 200) {
        res.status(200).json(data);  // Retorna os hóspedes se tudo deu certo
    } else {
        res.status(status).json(data);  // Retorna o erro com o código de status
    }
}
export async function mostrarSuite(req, res) {
    const [status, data] = await readSuite();
    if (status === 200) {
        res.status(200).json(data);
    } else {
        res.status(status).json(data);
    }
}

export async function mostrarChale(req, res) {
    const [status, data] = await readChale();
    if (status === 200) {
        res.status(200).json(data);
    } else {
        res.status(status).json(data);
    }
}

export async function mostrarCabana(req, res) {
    const [status, data] = await readCabana();
    if (status === 200) {
        res.status(200).json(data);
    } else {
        res.status(status).json(data);
    }
}

export async function mostrarDomo(req, res) {
    const [status, data] = await readDomo();
    if (status === 200) {
        res.status(200).json(data);
    } else {
        res.status(status).json(data);
    }
}

export async function mostrarBus(req, res) {
    const [status, data] = await readBus();
    if (status === 200) {
        res.status(200).json(data);
    } else {
        res.status(status).json(data);
    }
}

export async function mostrarEstacionamento(req, res) {
    const [status, data] = await readEstacionamento();
    if (status === 200) {
        res.status(200).json(data);
    } else {
        res.status(status).json(data);
    }
}

export async function Pendente(req, res) {
    const { id_acomodacao } = req.params;
    //Tentando atualizar reserva
    try {
        const [status, resposta] = await statusPendente(id_acomodacao);
        res.status(status).json(resposta)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function Indisponivel(req, res) {
    const { id_acomodacao } = req.params;
    //Tentando atualizar reserva
    try {
        
        const [status, resposta] = await statusIndisponivel(id_acomodacao);
        res.status(status).json(resposta)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function EmLimpeza(req, res) {
    const {id_acomodacao} = req.params;
    //Tentando atualizar reserva
    try {
        const [status, resposta] = await statusEmLimpeza(id_acomodacao);
        res.status(status).json(resposta)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function Manutencao(req, res) {
    const { id_acomodacao } = req.params;
    //Tentando atualizar reserva
    try {
        const [status, resposta] = await statusManutencao(id_acomodacao);
        res.status(status).json(resposta)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function Disponivel(req, res) {
    const { id_acomodacao } = req.params;
    //Tentando atualizar reserva
    try {
        const [status, resposta] = await statusDisponivel(id_acomodacao);
        res.status(status).json(resposta)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}