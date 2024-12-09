import React, { useEffect, useState } from 'react';
import Menu from '../../layout/menu';
import './Geral.modules.css';

function Geralmente() {
    const [infos, setInfos] = useState([]);

    useEffect(() => {
        baixarInfos();
    }, []);

    async function baixarInfos() {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/geral/tabela`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) { // Verificar se a resposta foi bem sucedida
                throw new Error('Erro ao buscar infos');
            }
            const consulta = await resposta.json();
            setInfos(consulta);
        } catch (error) {
            console.log('Erro ao consultar infos', error);
        }
    }

    // Função que retorna a classe com base no status
    const getCardClass = (status) => {
        switch (status) {
            case 1:
                return 'card red';
            case 2:
                return 'card blue';
            case 3:
                return 'card orange';
            default:
                return 'card'; // Caso não tenha status conhecido, retorna apenas 'card'
        }
    };

    // Funções para lidar com os cliques nos botões
    const handleActionClick = (action) => {
        console.log(`Botão ${action} clicado!`);
    };

    const handleIconClick = (icon) => {
        console.log(`Botão ${icon} clicado!`);
    };

    return (
        <div>
            <Menu />
            <div className="containerGeral">
                <div className="main-content">
                    {/* Área de Status */}
                    <div className="status">
                        <span className="status-label pending">Pendente</span>
                        <span className="status-label unavailable">Indisponível</span>
                        <span className="status-label available">Disponível</span>
                        <span className="status-label maintenance">Manutenção</span>
                        <span className="status-label cleaning">Em limpeza</span>
                    </div>

                    {/* Cards de Acomodações */}
                    <div>
                    {infos.map((info) => (
                        <div key={info.id_acomodacao} className={getCardClass(info.id_status_acomodacao)}>
                            <div>
                                <h3>{info.nome_acomodacao}</h3>
                                <p><strong>{info.nome_hospede}</strong></p>
                                <p>{info.checkin} - {info.checkout}</p>
                                <div className="icons">
                                    <button className="icon-button" title="Documentos" onClick={() => handleIconClick('documentos')}>&#x1F4C4;</button>
                                    <button className="icon-button" title="Perfil" onClick={() => handleIconClick('perfil')}>&#x1F464;</button>
                                    <button className="icon-button" title="Editar" onClick={() => handleIconClick('editar')}>&#x270F;</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Geralmente;
