import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import

function FormReserva({ titulo, textoBotao, handleSubmit, id_reserva, TextoValor }) {
    const navigate = useNavigate();
    //const [resultado, setResultado] = useState('');
    const [id_status_reserva, setStatus] = useState('');
    const [nome_hospede, setHospede] = useState('');
    const [id_acomodacao, setAcomodacao] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [qntd_hospedes, setQntd] = useState('');
    const [valor_total, setVT] = useState('');
    const [observacao, setObservacao] = useState('');

    useEffect(() => {
        if (id_reserva) {
            baixarReserva(id_reserva)
        }
    }, []);

    async function baixarReserva(id_reserva) {
        try {
            const resposta = await fetch(`http://localhost:5000/reservas/${id_reserva}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            

            if (!resposta.ok) {
                throw new Error('Erro ao buscar reserva');
            } else {
                const respostaJSON = await resposta.json();
                setStatus(respostaJSON.id_status_reserva);
                setHospede(respostaJSON.nome_hospede);
                setAcomodacao(respostaJSON.id_acomodacao);
                setCheckin(respostaJSON.checkin);
                setCheckout(respostaJSON.checkout);
                setQntd(respostaJSON.qntd_hospedes);
                setVT(respostaJSON.valor_total);
                setObservacao(respostaJSON.observacao);

               
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function submit(e) {
        e.preventDefault();
        const reserva = {
            id_status_reserva: id_status_reserva,
            id_hospede: nome_hospede,
            id_acomodacao: id_acomodacao,
            checkin: checkin,
            checkout: checkout,
            qntd_hospedes: qntd_hospedes,
            valor_total: valor_total,
            observacao: observacao
        };

        const tipo = await handleSubmit(reserva, id_reserva);
        console.log(tipo);
        navigate(`/reservas/${tipo}`);
    }

    return (
        <div className='container col-sm-12 col-md-6 col-lg-3 mt-3'>
            <h2 className="text-center">{titulo}</h2>
            <form onSubmit={submit}>
                <label className='form-label' htmlFor="status">Status</label>
                <select className='form-control' type="text" name="status" id="status" value={id_status_reserva} onChange={(e) => (setStatus(e.target.value))}>
                    <option value="" hidden></option>
                    <option value={1}>Solicitada</option>
                    <option value={2}>Reservada</option>
                    <option value={3}>Hospedada</option>
                    <option value={4}>Atrasada</option>
                    <option value={5}>Cancelada</option>
                    <option value={6}>Finalizada</option>
                </select>

                <label className='form-label' htmlFor="hospede">Nome do Hóspede:</label>
                <input className='form-control' type="text" name="hospede" id="hospede" value={nome_hospede} onChange={(e) => (setHospede(e.target.value))} />

                <label className='form-label' htmlFor="acomodacao">Acomodação:</label>
                <select className='form-control' name="acomodacao" id="acomodacao" value={id_acomodacao} onChange={(e) => (setAcomodacao(e.target.value))} required>
                    <option value="" hidden></option>
                    <option value={1}>Suíte com Cozinha</option>
                    <option value={2}>Chalé Família</option>
                    <option value={3}>Cabana</option>
                    <option value={4}>Domo</option>
                    <option value={5}>Bus</option>
                    <option value={6}>Estacionamento de Overlands</option>
                </select>

                <label className='form-label' htmlFor="checkin">Data de Check-in</label>
                <input className='form-control' type="date" name="checkin" id="checkin" value={checkin} onChange={(e) => (setCheckin(e.target.value))} />

                <label className='form-label' htmlFor="checkout">Data de Check-out:</label>
                <input className='form-control' type="date" name="checkout" id="checkout" value={checkout} onChange={(e) => (setCheckout(e.target.value))} />

                <label className='form-label' htmlFor="qntd">Quantidade de hóspedes:</label>
                <input className='form-control' type="number" name="qntd" id="qntd" value={qntd_hospedes} onChange={(e) => (setQntd(e.target.value))} />

                <label className='form-label' htmlFor="qntd">{TextoValor}</label>
                <input className='form-control' type="number" name="vt" id="vt" value={valor_total} onChange={(e) => (setVT(e.target.value))} />

                <label className='form-label' htmlFor="observacao">Observações:</label>
                <input className='form-control' type="text" name="observacao" id="observacao" value={observacao} onChange={(e) => (setObservacao(e.target.value))} />

                <div className="d-flex justify-content-between mt-3">
                    <a className="btn btn-danger" href="/reservas">Cancelar</a>
                    <button className="btn btn-success" type="submit">{textoBotao}</button>
                </div>
            </form>
        </div>
    );
}

export default FormReserva;
