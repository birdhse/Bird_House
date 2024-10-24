import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import

function FormReserva({ titulo, textoBotao, handleSubmit, id, tipo }) {
    const navigate = useNavigate();
    const [id_status, setStatus] = useState('');
    const [id_hospede, setHospede] = useState('');
    const [id_acomodacao, setAcomodacao] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [qntd, setQntd] = useState('');
    const [observacao, setObservacao] = useState('');

    useEffect(() => {
        if (id) {
            baixarReserva(id)
        }
    }, []);

    async function baixarReserva(id) {
        try {
            const resposta = await fetch(`http://localhost:5000/reservas/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                throw new Error('Erro ao buscar reserva');
            } else {
                const respostaJSON = await resposta.json();
                setStatus(respostaJSON.id_status);
                setHospede(respostaJSON.id_hospede);
                setAcomodacao(respostaJSON.id_acomodacao);
                setCheckin(respostaJSON.checkin);
                setCheckout(respostaJSON.checkout);
                setQntd(respostaJSON.qntd);
                setObservacao(respostaJSON.observacao);
            }
        } catch (error) {
            console.log(error)
        }
    }

    function submit(e) {
        e.preventDefault();
        const reserva = {
            id_status: id_status,
            id_hospede: id_hospede,
            id_acomodacao: id_acomodacao,
            checkin: checkin,
            checkout: checkout,
            qntd_hospedes: qntd,
            observacao: observacao,
            chave: null
        };

        handleSubmit(reserva, id);
        navigate(`/reservas/${tipo}`);
    }

    return (
        <div className='container col-sm-12 col-md-6 col-lg-3 mt-3'>
            <h2 className="text-center">{titulo}</h2>
            <form onSubmit={submit}>
                <label className='form-label' htmlFor="status">Status</label>
                <select className='form-control' type="text" name="status" id="status" value={id_status} onChange={(e) => (setStatus(e.target.value))}>
                    <option value="" selected hidden></option>
                    <option value="reservado">Reservado</option>
                    <option value="hospedado">Hospedado</option>
                    <option value="em limpeza">Em limpeza</option>
                    <option value="bloqueado">Bloqueado</option>
                    <option value="finalizado">Finalizado</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="atrasado">Atrasado</option>
                    <option value="vencido">Vencido</option>
                </select>
                <label className='form-label' htmlFor="hospede">Nome do Hóspede:</label>
                <input className='form-control' type="text" name="hospede" id="hospede" value={id_hospede} onChange={(e) => (setHospede(e.target.value))} />

                <label className='form-label' htmlFor="acomodacao">Acomodação:</label>
                <select className='form-control' name="acomodacao" id="acomodacao" value={id_acomodacao} onChange={(e) => (setAcomodacao(e.target.value))} required>
                    <option value="" selected hidden></option>
                    <option value="suite-cozinha">Suíte com Cozinha</option>
                    <option value="chale-familia">Chalé Família</option>
                    <option value="cabana">Cabana</option>
                    <option value="domo">Domo</option>
                    <option value="bus">Bus</option>
                    <option value="estacionamento-overlands">Estacionamento de Overlands</option>
                </select>


                <label className='form-label' htmlFor="checkin">Data de Check-in</label>
                <input className='form-control' type="date" name="checkin" id="checkin" value={checkin} onChange={(e) => (setCheckin(e.target.value))} />

                <label className='form-label' htmlFor="checkout">Data de Check-out:</label>
                <input className='form-control' type="date" name="checkout" id="checkout" value={checkout} onChange={(e) => (setCheckout(e.target.value))} />

                <label className='form-label' htmlFor="qntd">Quantidade de hóspedes:</label>
                <input className='form-control' type="number" name="qntd" id="qntd" value={qntd} onChange={(e) => (setQntd(e.target.value))} />

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
