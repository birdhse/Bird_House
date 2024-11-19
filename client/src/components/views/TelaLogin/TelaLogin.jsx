import React, { useState } from 'react';
import styles from './TelaLogin.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function TelaLogin() {
    const [login_usuario, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    async function efetuarLogin(e) {
        e.preventDefault(); // Prevenir o comportamento padrão do botão/link

        const dadosLogin = { login_usuario, senha };

        try {
            const resposta = await fetch('http://localhost:5000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosLogin),
            });

            if (!resposta.ok) {
                alert('Usuário ou senha inválidos!');
            } else {
                const respostaJSON = await resposta.json();
                localStorage.setItem('id_usuario', respostaJSON.id_usuario);
                window.location.href = '/';
            }
        } catch (error) {
            console.log('Erro ao efetuar login:', error);
            alert('Erro ao se conectar ao servidor. Tente novamente mais tarde.');
        }
    }

    return (
        <div className={`login-container d-flex align-items-center justify-content-center ${styles.fundo}`}>
            <div className="login-box p-4 rounded shadow bg-light">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={efetuarLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
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
                    <button type="submit" className="btn btn-danger w-100 mt-4">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TelaLogin;
