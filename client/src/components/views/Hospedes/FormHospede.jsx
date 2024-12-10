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


    const validarCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Valida se o CPF tem 11 dígitos e não é uma sequência repetida

        let soma = 0, resto;

        // Validação do primeiro dígito verificador
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;

        // Validação do segundo dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[10])) return false;

        return true;
    };

    const verificarIdade = (dataNascimento) => {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }

        return idade >= 18;
    };


    return (
        <div className='container col-sm-12 col-md-6 col-lg-3 mt-3'>
            <h2 className="text-center">{titulo}</h2>
            <form onSubmit={submit}>
                <label className='form-label' htmlFor="nome">Nome do Hospede</label>
                <input className='form-control' type="text" name="nome" id="nome" value={nome_hospede} onChange={(e) => (setNome(e.target.value))} />
                {nome_hospede === '' && <small className="text-danger">O nome é obrigatório.</small>}

                <label className='form-label' htmlFor="cel">Numero de Celular:</label>
                <input className='form-control' type="text" name="cel" id="cel" value={num_celular} onChange={(e) => (setCelular(e.target.value))} />
                {!/^\d{10,11}$/.test(num_celular) && num_celular !== '' && <small className="text-danger">Informe um número de celular válido.</small>}

                <label className='form-label' htmlFor="email">Email:</label>
                <input className='form-control' type="text" name="email" id="email" value={email_hospede} onChange={(e) => (setEmail(e.target.value))} />
                {!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email_hospede) && email_hospede !== '' && <small className="text-danger">Informe um e-mail válido.</small>}

                <label className='form-label' htmlFor="nascimento">Data de Nascimento</label>
                <input
                    className='form-control'
                    type="date"
                    name="nascimento"
                    id="nascimento"
                    value={data_nascimento ? data_nascimento.split('T')[0] : ''} // Garante formato YYYY-MM-DD
                    onChange={(e) => setNascimento(e.target.value)}
                />
                {data_nascimento !== '' && !verificarIdade(data_nascimento) && (
                    <small className="text-danger">É necessário ter pelo menos 18 anos.</small>
                )}


                <label className='form-label' htmlFor="cpf">CPF:</label>
                <input className='form-control' type="text" name="cpf" id="cpf" value={cpf_hospede} onChange={(e) => (setCPF(e.target.value))} />
                {cpf_hospede !== '' && (!validarCPF(cpf_hospede) ? <small className="text-danger">Informe um CPF válido.</small> : null)}

                <div className="d-flex justify-content-between mt-3">
                    <a className="btn btn-danger" href="/hospedes">Cancelar</a>
                    <button className="btn btn-success" type="submit">{textoBotao}</button>
                </div>
            </form>
        </div>


    );
}

export default FormHospede;
