import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function FormReserva({ titulo, textoBotao, handleSubmit, id, tipo }) {
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [hospede, setHospede] = useState('');
    const [acomodacao, setAcomodacao] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [qntd, setQntd] = useState('');

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
                console.log(respostaJSON);
                setStatus(respostaJSON.status);
                setHospede(respostaJSON.hospede);
                setAcomodacao(respostaJSON.acomodacao);
                setCheckin(respostaJSON.checkin);
                setCheckout(respostaJSON.checkout);
                setQntd(respostaJSON.qntd);
            }
        } catch (error) {
            console.log(error)
        }
    }

    function submit(e) {
        e.preventDefault();
        const reserva = {
            status: status,
            hospede: hospede,
            acomodacao: acomodacao,
            checkin: checkin,
            checkout: checkout,
            qntd: qntd,
            chave: null
        }

        handleSubmit(reserva, id);
        navigate(`/reservas/${tipo}`)
    }

    return (
        <div className='container col-sm-12 col-md-6 col-lg-3 mt-3'>
            <h2 className="text-center">{titulo}</h2>
            <form onSubmit={submit}>
                <label className='form-label' htmlFor="">Status</label>
                <input className='form-control' type="text" name="" id="" value={status} onChange={(e) => (setStatus(e.target.value))} />

                <label className='form-label' htmlFor="">Nome do Hóspede:</label>
                <input className='form-control' type="text" name="" id="" value={hospede} onChange={(e) => (setHospede(e.target.value))} />

                <label className='form-label' htmlFor="">Acomodação:</label>
                <input className='form-control' type="text" name="" id="" value={acomodacao} onChange={(e) => (setAcomodacao(e.target.value))} />

                <label className='form-label' htmlFor="">Data de Check-in</label>
                <input className='form-control' type="date" name="" id="" value={checkin} onChange={(e) => (setCheckin(e.target.value))} />

                <label className='form-label' htmlFor="">Data de Check-out:</label>
                <input className='form-control' type="date" name="" id="" value={checkout} onChange={(e) => (setCheckout(e.target.value))} />

                <label className='form-label' htmlFor="">Quantidade de hóspedes:</label>
                <input className='form-control' type="text" name="" id="" value={qntd} onChange={(e) => (setQntd(e.target.value))} />

                <a className="btn btn-danger mt-3 float-start" href="">Cancelar</a>
                <button className="btn btn-success mt-3 float-end" type="submit">{textoBotao}</button>
            </form>
        </div>
    )
}

export default FormReserva