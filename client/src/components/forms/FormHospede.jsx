import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import

function FormHosp({ titulo, textoBotao, handleSubmit, id_hospede, tipo }) {
    const navigate = useNavigate();
    const [id_status, setStatus] = useState('');
    const [id_hospede, setHospede] = useState('');
    const [nome_hospede, setNomeHospede] = useState('');
    const [num_celular, setNumCelular] = useState('');
    const [email_hospede, setEmailHospede] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [cpf_hospede, setCpfHospede] = useState('');

    useEffect(() => {
        if (id_hospede) {
            baixarHospede(id_hospede)
        }
    }, []);

    async function baixarHospede(id_hospede) {
        try {
            const resposta = await fetch(`http://localhost:5000/hospedes/${id_hospede}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                throw new Error('Erro ao buscar Hospede');
            } else {
                const respostaJSON = await resposta.json();
                setHospede(respostaJSON.id_hospede);
                setNomeHospede(respostaJSON.nome_hospede)
                setNumCelular(respostaJSON.num_celular);
                setEmailHospede(respostaJSON.email_hospede);
                setDataNascimento(respostaJSON.data_nascimento);
                setCpfHospede(respostaJSON.cpf_hospede);
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
            nome_hospede: nome_hospede,
            num_celular: num_celular,
            email_hospede: email_hospede,
            data_nascimento: data_nascimento,
            cpf_hospede: cpf_hospede,
            chave: null
        };

        handleSubmit(hospede, id_hospede);
        navigate(`/hospedes/${tipo}`);
    }

    return (
        <div className='container col-sm-12 col-md-6 col-lg-3 mt-3'>
            <h2>Editar Hospéde</h2>
            <form onSubmit={submit}>
                
                <label className='form-label' htmlFor="nome_hospede">Nome Hóspede:</label>
                <input className='form-control' type="text" name="nome_hospede" id="nome_hospede" value={nome_hospede} onChange={(e) => (setHospede(e.target.value))} />

                <label className='form-label' htmlFor="num_celular">Contato:</label>
                <input className='form-control' type="text" name="num_celular" id="num_celular" value={num_celular} onChange={(e) => (setObservacao(e.target.value))} />

                <label className='form-label' htmlFor="email_hospede">E-mail:</label>
                <input className='form-control' type="text" name="email_hospede" id="email_hospede" value={email_hospede} onChange={(e) => (setCheckin(e.target.value))} />

                <label className='form-label' htmlFor="data_nascimento">Data de Nascimento:</label>
                <input className='form-control' type="text" name="data_nascimento" id="data_nascimento" value={data_nascimento} onChange={(e) => (setObservacao(e.target.value))} />

                <label className='form-label' htmlFor="cpf_hospede">CPF:</label>
                <input className='form-control' type="text" name="cpf_hospede" id="cpf_hospede" value={cpf_hospede} onChange={(e) => (setQntd(e.target.value))} />
             
                <div className="d-flex justify-content-between mt-3">
                    <a className="btn btn-danger" href="/reservas">Cancelar</a>
                    <button className="btn btn-success" type="submit">{textoBotao}</button>
                </div>
            </form>
        </div>
    );
}

export default FormHosp;
