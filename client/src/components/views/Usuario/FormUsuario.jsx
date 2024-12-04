import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import

function FormUsuario({ titulo, textoBotao,handleSubmit, id_usuario, TextoValor }) {
    const navigate = useNavigate();
    //const [resultado, setResultado] = useState('');
    const [nome_usuario, setNome] = useState('');
    const [email_usuario, setEmail] = useState('');
    const [login_usuario, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [id_cargo, setCargo] = useState('');

    useEffect(() => {
        if (id_usuario) {
            baixarUsuario(id_usuario)
        }
    }, []);

    async function baixarUsuario(id_usuario) {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/usuarios/${id_usuario}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            

            if (!resposta.ok) {
                throw new Error('Erro ao buscar usuario');
            } else {
                const respostaJSON = await resposta.json();
                setNome(respostaJSON.nome_usuario);
                setEmail(respostaJSON.email_usuario);
                setLogin(respostaJSON.login_usuario);
                setSenha(respostaJSON.senha);
                setCargo(respostaJSON.id_cargo);

            }
        } catch (error) {
            console.log(error)
        }
    }

    async function submit(e) {
        e.preventDefault();
        const usuario = {
            nome_usuario: nome_usuario,
            email_usuario: email_usuario,
            login_usuario: login_usuario,
            senha: senha,
            id_cargo: id_cargo
        };

        const tipo = await handleSubmit(usuario, id_usuario);
        console.log(tipo);
        navigate(`/usuarios/${tipo}`);
    }

    return (
        <div className='container col-sm-12 col-md-6 col-lg-3 mt-3'>
    <h2 className="text-center">{titulo}</h2>
    <form onSubmit={submit}>

        <label className='form-label' htmlFor="usuario">Nome do Usuário:</label>
        <input className='form-control' type="text" name="usuario" id="usuario" value={nome_usuario} onChange={(e) => (setNome(e.target.value))} />
        {nome_usuario === '' && <small className="text-danger">O nome do usuário é obrigatório.</small>}

        <label className='form-label' htmlFor="email">Email do Usuário:</label>
        <input className='form-control' type="text" name="email" id="email" value={email_usuario} onChange={(e) => (setEmail(e.target.value))} />
        {!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email_usuario) && email_usuario !== '' && <small className="text-danger">Informe um e-mail válido.</small>}

        <label className='form-label' htmlFor="login">Login do Usuário:</label>
        <input className='form-control' type="text" name="login" id="login" value={login_usuario} onChange={(e) => (setLogin(e.target.value))} />
        {login_usuario === '' && <small className="text-danger">O login é obrigatório.</small>}

        <label className='form-label' htmlFor="senha">Senha:</label>
        <input className='form-control' type="text" name="senha" id="senha" value={senha} onChange={(e) => (setSenha(e.target.value))} />
        {senha.length < 6 && senha !== '' && <small className="text-danger">A senha deve ter no mínimo 6 caracteres.</small>}

        <label className='form-label' htmlFor="cargo">Função</label>
        <select className='form-control' name="cargo" id="cargo" value={id_cargo} onChange={(e) => (setCargo(e.target.value))}>
            <option value="" hidden>Selecione uma função</option>
            <option value={1}>Administrador</option>
            <option value={2}>Funcionário</option>
        </select>
        {id_cargo === '' && <small className="text-danger">Selecione uma função.</small>}

        <div className="d-flex justify-content-between mt-3">
            <a className="btn btn-danger" href="/usuarios">Cancelar</a>
            <button className="btn btn-success" type="submit">{textoBotao}</button>
        </div>
    </form>
</div>

    
    );
}

export default FormUsuario;
