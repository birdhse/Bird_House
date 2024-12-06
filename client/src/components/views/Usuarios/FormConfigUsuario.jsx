import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";

function ConfigUsuario({ handleSubmit, id_usuario }) {
  // const id_usuario = id_usuario;
  const [nome_usuario, setNome] = useState('');
  const [email_usuario, setEmail] = useState('');
  const [login_usuario, setLogin] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id_usuario);
    if (id_usuario) {
      console.log(id_usuario);
      baixarUsuario(id_usuario)
    }
  }, []);

  async function baixarUsuario(id_usuario) {
    try {
      const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/config_usuarios/${id_usuario}`, {
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
      }
    } catch (error) {
      console.log(error)
    }
  }


  async function submit(e) {
    e.preventDefault();
    const usuario = {
      email_usuario: email_usuario,
      senha: password
    };

    const tipo = await handleSubmit();
    console.log(tipo);
    navigate(`/config_usuarios/${tipo}`);

  }

  return (
    <div>

      <div className="container mt-5 ">
        <h1 className='text-center mt-3'>Configuração do Usuário</h1>

        <div className="content">
          <h1>{login_usuario}</h1>

          <form onSubmit={submit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Nome Completo</label>
              <input type="text" id="name" className="form-control w-1 p-2" defaultValue={nome_usuario} readOnly />
            </div>


            <div className="mb-4">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input type="email" id="email" className="form-control w-1 p-2" defaultValue={email_usuario} />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Senha</label>
              <input type={showPassword ? "text" : "password"} id="password" className="form-control w-1 p-2" placeholder="Digite sua senha" value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(e.target.value.length <= 6 ? "A senha deve ter mais de 6 caracteres" : "");
                }}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirm-password" className="form-label">Confirmar Senha</label>
              <input type="password" id="confirm-password" className="form-control w-1 p-2" placeholder="Confirme sua senha" value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  const confirmError =
                    e.target.value !== password ? "As senhas não coincidem" : "";
                  setError(confirmError);
                }}
              />
              {error && <small className="text-danger">{error}</small>}
            </div>

            <div className="d-flex align-items-center gap-2">
              <button type="submit" className="btn btn-info text-white" onClick={() => {
                const confirmChange = window.confirm("Você tem certeza que deseja fazer essas alterações?");
                if (confirmChange) {
                  alert("Informações alteradas com sucesso!");
                }
              }}
              >Alterar</button>

              <a href="#" className="text-primary" onClick={(e) => { e.preventDefault(); alert("Para ajuda entre em contato através do e-mail: matheus.brunelli@aluno.senai.br ou entre em contato com seu administrador") }}>
                Ajuda
              </a>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfigUsuario;
