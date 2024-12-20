import React, { useState } from 'react';
import styles from './TelaLogin.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function TelaLogin() {
    const [login_usuario, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    async function efetuarLogin() {
        const dadosLogin = { login_usuario, senha };

        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLogin)
            });
            if (!resposta.ok) {
                alert('Usuário ou senha inválidos!!!');
            } else {
                const respostaJSON = await resposta.json();
                localStorage.setItem('id_usuario', respostaJSON.id_usuario);
                window.location.href = '/geral';
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`login-container d-flex align-items-center justify-content-center ${styles.fundo}`}>
            <div className="login-box p-4 rounded shadow bg-light">
                <h2 className="text-center mb-4">Login</h2>
                <div className="form-group">
                    <label>Login</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Login"
                        value={login_usuario}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <button className="btn btn-danger w-100 mt-4" onClick={efetuarLogin}>
                    Enviar
                </button>
                {/* Esqueci a senha */}
                <div className="text-center mt-3">
                    <a href="/esqueci_senha" className="text-secondary">
                        Esqueci a senha
                    </a>
                </div>
            </div>
        </div>

    );
}

export default TelaLogin;
