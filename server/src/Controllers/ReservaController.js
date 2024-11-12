import { createReserva, deleteReserva, updateReserva, readReserva, showOneReserva } from '../Models/ReservaModel.js'

export async function criaReserva(req, res) {

    //Ao ser chamado o criarAula controller virá no console
    console.log('ReservaController criarReserva');
    const reserva = req.body;

    //Exibindo corpo da requisição
    console.log(reserva);
    try {
        const [status, resposta] = await createReserva(reserva);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function mostrarReservas(req, res) {
    console.log('ReservaController mostrarReserva');
    const reserva = req.body;

    //Exibindo corpo da requisição
    console.log(reserva);

    try {
        const [status, resposta] = await readReserva(reserva);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function atualizarReserva(req, res) {
    console.log('ReservaController atualizarReserva');

    const reserva = req.body;
    const { id_reserva } = req.params;
    try {
        const [status, resposta] = await updateReserva(reserva, id_reserva);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

export async function excluirReserva(req, res) {
    console.log('ReservaController excluirReserva');

    const { id_reserva } = req.params;

        try {
            const [status, resposta] = await deleteReserva(id_reserva);
            res.status(status).json(resposta);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

export async function mostrarUmaReserva(req, res) {
    console.log('ReservaController mostrarUmaReserva');

    const { id } = req.params;
    try {
        const [status, resposta] = await showOneReserva(id);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}