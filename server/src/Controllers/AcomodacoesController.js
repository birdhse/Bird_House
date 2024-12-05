import { readInfo } from "../Models/AcomocacoesModel.js";


export async function mostrarInfos(req, res) {
    const [status, data] = await readInfo(); // Desestruture o retorno corretamente
    if (status === 200) {
        res.status(200).json(data);  // Retorna os hóspedes se tudo deu certo
    } else {
        res.status(status).json(data);  // Retorna o erro com o código de status
    }
}