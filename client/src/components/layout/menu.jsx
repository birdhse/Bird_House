import React from 'react';
import styles from './menu.modules.css';
import Data from './data';
import Relogio from './relogio';
import BirdLogo from '../../images/bbhouse.png';

function Menu() {
    const handleSettingsClick = () => {
        alert('Configurações clicadas!');
        // Adicione a lógica necessária para a ação do botão de configurações
    };

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <div className='menu_superior'>
                <div className='elementos_menu_superior'>
                    <h2 className="logo">
                        <img src={BirdLogo} alt="Bird Logo" className="logo-image" />
                        Bird House
                    </h2>
                    <h3 className='data'><Data /></h3>
                    <h3 className='relogio'><Relogio /></h3>
                    {/* Botão de configurações */}
                    <button 
                        className="icon-button" 
                        title="Configurações" 
                        onClick={handleSettingsClick}
                    >
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </div>
            </div>
            <div className='menu_lateral'>
                <ul>
                    <li><a href="/geral">Geral</a></li>
                    <li><a href="/reservas">Reservas</a></li>
                    <li><a href="/hospedes">Hóspedes</a></li>
                    <li><a href="/usuarios">Usuários</a></li>
                    <li><a href="/relatorios">Relatórios</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;
