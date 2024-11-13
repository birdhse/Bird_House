import React from "react";
import Menu from '../../layout/menu';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import styles from './Config.module.css';

function ConfigUsuario() {
  return (
    <div>
      <Menu /> 
      
    <div className="container mt-5 ">

      <h1 className='text-center mt-3'>Configuração do Usuário</h1>
      
        <div className="content">
         
            
        
            

            <h1>Amanda Xavier</h1>

            <form>
              <div className="mb-4 ">
                <label htmlFor="name" className="form-label">Nome Completo</label>
                <input type="text" id="name" className="form-control w-1 p-2" defaultValue="Amanda Xavier" />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input type="email" id="email" className="form-control w-1 p-2" defaultValue="amanda@gmail.com" />
              </div>

              <div className="mb-4">
                <label htmlFor="role" className="form-label">Função</label>
                <select id="relatorio" className="form-select w-1 p-2">
                   <option value="1">Admnistrador</option>
                   <option value="2">Funcionário Geral</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">Senha</label>
                <input type="password" id="password" className="form-control w-1 p-2" placeholder="" />
              </div>

              <div className="form-check mb-3">
                <input type="checkbox" id="active" className="form-check-input" defaultChecked />
                <label htmlFor="active" className="form-check-label w-1">Ativo</label>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button type="button" className="btn btn-info text-white" onClick={() => alert("Função para alterar a senha!")}>
                  Alterar
                </button>
                <a href="#" className="text-primary" onClick={(e) => { e.preventDefault(); alert("Ajuda!") }}>
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