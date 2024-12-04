import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import

function FormHospede({ titulo, textoBotao, handleSubmit, id_hospede }) {
    const navigate = useNavigate();

    const [nome_hospede, setNome] = useState('');
    const [num_celular, setCelular] = useState('');
    const [email_hospede, setEmail] = useState('');
    const [data_nascimento, setNascimento] = useState('');
    const [cpf_hospede, setCPF] = useState('');

    useEffect(() => {
        if (id_hospede) {
            baixarHospede(id_hospede)
        }
    }, []);

    async function baixarHospede(id_hospede) {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/hospedes/${id_hospede}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                throw new Error('Erro ao buscar reserva');
            } else {
                const respostaJSON = await resposta.json();
                setNome(respostaJSON.nome_hospede);
                setCelular(respostaJSON.num_celular);
                setEmail(respostaJSON.email_hospede);
                setNascimento(respostaJSON.data_nascimento);
                setCPF(respostaJSON.cpf_hospede);
            }
        } catch (error) {
            console.log(error)
        }
    }


    async function submit(e) {
        e.preventDefault();
        const hospede = {
            nome_hospede: nome_hospede,
            num_celular: num_celular,
            email_hospede: email_hospede,
            data_nascimento: data_nascimento,
            cpf_hospede: cpf_hospede
        };

        const tipo = await handleSubmit(hospede, id_hospede);
        console.log(tipo);
        navigate(`/hospedes/${tipo}`);
    }

    return (
        <div className='container col-sm-12 col-md-6 col-lg-3 mt-3'>
            <h2 className="text-center">{titulo}</h2>
            <form onSubmit={submit}>
                <label className='form-label' htmlFor="nome">Nome do Hospede</label>
                <input className='form-control' type="text" name="nome" id="nome" value={nome_hospede} onChange={(e) => (setNome(e.target.value))} />

                <label className='form-label' htmlFor="cel">Numero de Celular:</label>
                <input className='form-control' type="text" name="cel" id="cel" value={num_celular} onChange={(e) => (setCelular(e.target.value))} />

                <label className='form-label' htmlFor="email">Email:</label>
                <input className='form-control' type="text" name="email" id="email" value={email_hospede} onChange={(e) => (setEmail(e.target.value))} />

                <label className='form-label' htmlFor="nascimento">Data de Nascimento</label>
                <input className='form-control' type="date" name="nascimento" id="nascimento" value={new Date(data_nascimento).toLocaleDateString('en-CA')} onChange={(e) => (setNascimento(e.target.value))} />

                <label className='form-label' htmlFor="cpf">CPF:</label>
                <input className='form-control' type="text" name="cpf" id="cpf" value={cpf_hospede} onChange={(e) => (setCPF(e.target.value))} />

                <div className="d-flex justify-content-between mt-3">
                    <a className="btn btn-danger" href="/hospedes">Cancelar</a>
                    <button className="btn btn-success" type="submit">{textoBotao}</button>
                </div>
            </form>
        </div>
    );
}

export default FormHospede;
