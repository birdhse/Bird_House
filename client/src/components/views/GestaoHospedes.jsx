import React from 'react'
import Menu from '../layout/menu';

function Hospedes() {
    function showTab(tabId) {
        // Remove a classe "active" de todos os botões
        const tabButtons = document.querySelectorAll('.tab');
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
    
        // Adiciona a classe "active" ao botão clicado
        const ButtonClicado = document.querySelector(`#${tabId}`);
        ButtonClicado.classList.add('active');
    
        // Esconde todas as abas
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(tabContent => {
            tabContent.style.display = 'none';
        });
    
        // Mostra a aba correspondente ao botão clicado
        const TabContentSelecionado = document.getElementById(tabId);
        TabContentSelecionado.style.display = 'block';
    }

    return (
        <div>
            <Menu/>

            <div class="main">
                <div class="breadcrumb">
                    Geral / Cadastros
                </div>
                <div class="content">
                    <h2>Amanda Xavier</h2>
                    <div class="tabs">
                        <button class="tab active" onClick={() => showTab('info')}>Informações do hóspede</button>
                        <button class="tab" onClick={() => showTab('history')}>Histórico de estadias</button>
                    </div>

                    <div class="tab-content" id="info" style={{display: 'block'}}>
                        <div class="profile-pic">
                            <img src="avatar.png" alt="Foto de perfil"></img>
                            <button>Selecionar uma foto (Proporção: 500 x 500)</button>
                        </div>
                        <form>
                            <label for="nome">Nome completo</label>
                            <input type="text" id="nome" value="Amanda Xavier"></input>

                            <label for="email">E-mail</label>
                            <input type="email" id="email" value="amanda@gmail.com"></input>

                            <label for="cpf">CPF</label>
                            <input type="text" id="cpf" value="000000000-00"></input>

                            <label for="nascimento">Nascimento</label>
                            <input type="date" id="nascimento" value="2003-03-30"></input>

                            <label for="sexo">Sexo</label>
                            <input type="text" id="sexo" value="Feminino"></input>

                            <label for="contato">Contato</label>
                            <input type="text" id="contato" value="(00) 000000000"></input>
                        </form>
                    </div>
                    <div class="tab-content" id="history" style={{ display: 'none' }}>
                        <p>Histórico de estadias não disponível.</p>
                    </div>
                </div>
            </div>
            <script src="Cadastro.js"></script>
        </div>



    )
}

export default Hospedes;