import React from 'react'
function Cadastros() {
    return (
        <div>
            <div class="container">
                <div>
                    <div id="navegacao">
                        <div id="area_menu">
                            <h1 id="logo">Bird House</h1>

                            <input type="text" id="txtBusca" placeholder="Buscar..." />
                            <label id="data">23/04/2024</label>

                        </div>
                    </div>
                </div>

                <div id="menu_lateral">
                    <ul>
                        <li><a href="/">Geral</a></li>
                        <li><a href="link2.htm">Mapa</a></li>
                        <li><a href="/reservas">Reservas</a></li>
                        <li class="link_ativo"><a href="/cadastros">Cadastros</a></li>
                        <li><a href="link5.htm">Transações</a></li>
                    </ul>
                </div>

                <div class="main">
                    <div class="breadcrumb">
                        Geral / Cadastros
                    </div>
                    <div class="content">
                        <h2>Amanda Xavier</h2>
                        <div class="tabs">
                            <button class="tab active" onclick="showTab('info')">Informações do hóspede</button>
                            <button class="tab" onclick="showTab('history')">Histórico de estadias</button>
                        </div>
                        <div class="tab-content" id="info">
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
                        <div class="tab-content" id="history" style={{display:'none'}}>
                            <p>Histórico de estadias não disponível.</p>
                        </div>
                    </div>
                </div>
            </div>
                <script src="js3/js3.js"></script>
        </div>

 )
}

export default Cadastros