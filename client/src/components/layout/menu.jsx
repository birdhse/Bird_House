import React, { useEffect, useState } from 'react';
import styles from './menu.modules.css';
import Data from './data';
import Relogio from './relogio';
import BirdLogo from '../../images/bbhouse.png';
import { useNavigate } from 'react-router-dom';

function Menu() {
    const navigate = useNavigate();
    const [idCargo, setIdCargo] = useState(null); // Estado para armazenar o id_cargo do usuário

    useEffect(() => {
        const id_usuario = localStorage.getItem('id_usuario');
        console.log(id_usuario);
        if (!id_usuario) {
            navigate("/"); // Redireciona se o usuário não estiver logado
        } else {
            verificaPermissao(id_usuario);
        }
        async function verificaPermissao(id_usuario) {
            try {
                const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/usuarios/${id_usuario}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                    const respostaJSON = await resposta.json();
                    setIdCargo(respostaJSON.id_cargo); // Salva o id_cargo no estado
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    async function verificaLogin() {
        const id_usuario = localStorage.getItem('id_usuario');
        console.log(id_usuario);
        if (!id_usuario) {
            navigate("/"); // Redireciona se o usuário não estiver logado
        }
    }

   

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
                    ><a href='/usuario_config'>
                        <span className="material-symbols-outlined">settings</span></a>
                    </button>
                </div>
            </div>
            <div className='menu_lateral'>
                <ul>
                    <li><a href="/geral">Geral</a></li>
                    <li><a href="/reservas">Reservas</a></li>
                    <li><a href="/hospedes">Hóspedes</a></li>
                    {/* Condicionalmente renderiza os links de "Usuários" e "Relatórios" se o id_cargo for 1 */}
                    {idCargo === 1 && <li><a href="/usuarios">Usuários</a></li>}
                    {idCargo === 1 && <li><a href="/relatorios">Relatórios</a></li>}
                   
                </ul>
            </div>
        </div>
    );
}

export default Menu;
