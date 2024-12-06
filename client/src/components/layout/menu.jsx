import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './menu.modules.css';
import Data from './data';
import Relogio from './relogio';
import BirdLogo from '../../images/bbhouse.png';

async function verificaPermissao(id_usuario, setIdCargo) {
    try {
        const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/usuarios/${id_usuario}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const respostaJSON = await resposta.json();
        setIdCargo(respostaJSON.id_cargo);
    } catch (error) {
        console.error("Erro ao verificar permissões:", error);
    }
}

function Menu() {
    const navigate = useNavigate();
    const [id_usuario, setIdUsuario] = useState(localStorage.getItem('id_usuario'));
    const [idCargo, setIdCargo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Estado para exibir a mensagem de confirmação

    useEffect(() => {
        setIdUsuario(localStorage.getItem('id_usuario'));
        console.log(id_usuario);
        if (!id_usuario) {
            navigate("/");
        } else {
            verificaPermissao(id_usuario, setIdCargo).finally(() => setLoading(false));
        }
    }, []);

    const deslogar = () => {
        localStorage.removeItem('id_usuario');
        navigate("/");
    };

    if (loading) {
        return <div>Carregando...</div>;
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
                    <button className="icon-button" title="Configurações">
                        <Link to={`/config_usuarios/${id_usuario}`}>
                            <span className="material-symbols-outlined">settings</span>
                        </Link>
                    </button>
                    <button
                        className="icon-button"
                        title="Deslogar"
                        onClick={() => setShowLogoutConfirm(true)} // Exibe a mensagem de confirmação
                    >
                        <span className="material-symbols-outlined">logout</span>
                    </button>
                </div>
            </div>
            <div className='menu_lateral'>
                <ul>
                    <li><Link to="/geral">Geral</Link></li>
                    <li><Link to="/reservas">Reservas</Link></li>
                    <li><Link to="/hospedes">Hóspedes</Link></li>
                    {idCargo === 1 && (
                        <>
                            <li><Link to="/usuarios">Usuários</Link></li>
                            <li><Link to="/relatorios">Relatórios</Link></li>
                        </>
                    )}
                </ul>
            </div>
            {showLogoutConfirm && (
                <div className="logout-confirmation">
                    <p>Deseja realmente sair?</p>
                    <button onClick={deslogar} className="logout-button">Sair</button>
                    <button onClick={() => setShowLogoutConfirm(false)} className="cancel-button">Cancelar</button>
                </div>
            )}
        </div>
    );
}

export default Menu;
