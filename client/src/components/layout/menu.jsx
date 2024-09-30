import React from 'react'
import styles from './menu.modules.css';

function Menu() {
    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <div id="menu_superior">
                <div id="elementos_menu_superior">
                    <h1 id="logo">Bird House</h1>
                    <input type="text" id="txtBusca" placeholder="Buscar..." />

                    <label id="data">23/04/2024</label>
                    <span class="material-symbols-outlined"> notifications </span>
                </div>
            </div>
            <div id="menu_lateral">
                <ul>
                    <li><a href="/">Geral</a></li>
                    <li><a href="/reservas">Reservas</a></li>
                    <li><a href="/cadastros">Hóspedes</a></li>
                    <li><a href="/relatorios">Relatórios</a></li>
                    <li><a href="/usuarios">Usuários</a></li>
                </ul>
            </div>
        </div>
    )
}

/*
JS da tela login (Validação e banco de dados)
Tirar status de vencido, apenas cancelado
Tirar status em limpeza, apenas bloqueado
Ajeitar tela inicial
Ajeitar todas as telas
Fazer tela lista de hospedes
Tela de usuarios
Tela de configurações, mudar senha
*/

export default Menu;