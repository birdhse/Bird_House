import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import

function FormEditHosp({ titulo, textoBotao, handleSubmit, id, tipo }) {
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
            const resposta = await fetch(`http://localhost:5000/rei/${id}`, {
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
            <h2>Editar Hospéde</h2>
            <form onSubmit={submit}>
                
                <label className='form-label' htmlFor="nome_hospede">Hóspede:</label>
                <input className='form-control' type="text" name="nome_hospede" id="nome_hospede" value={nome_hospede} onChange={(e) => (setHospede(e.target.value))} />

                <label className='form-label' htmlFor="email_hospede">E-mail:</label>
                <input className='form-control' type="text" name="email_hospede" id="email_hospede" value={email_hospede} onChange={(e) => (setCheckin(e.target.value))} />

                <label className='form-label' htmlFor="cpf_hospede">CPF:</label>
                <input className='form-control' type="text" name="cpf_hospede" id="cpf_hospede" value={cpf_hospede} onChange={(e) => (setQntd(e.target.value))} />

                <label className='form-label' htmlFor="data_nascimento">Data de Nascimento:</label>
                <input className='form-control' type="text" name="data_nascimento" id="data_nascimento" value={data_nascimento} onChange={(e) => (setObservacao(e.target.value))} />

                <label className='form-label' htmlFor="num_celular">Contato:</label>
                <input className='form-control' type="text" name="num_celular" id="num_celular" value={num_celular} onChange={(e) => (setObservacao(e.target.value))} />

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

export default FormEditHosp;
