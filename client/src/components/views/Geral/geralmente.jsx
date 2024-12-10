import React, { useEffect, useState } from 'react';
import Menu from '../../layout/menu';
import './Geral.modules.css';

function Geralmente() {
    const [suitehospede, setHospedeS] = useState('');
    const [suitecheckin, setCheckinS] = useState('');
    const [suitecheckout, setCheckoutS] = useState('');
    const [suiteStatus, setStatusS] = useState("");

    const [chalehospede, setHospedeC] = useState("");
    const [chalechekin, setCheckinC] = useState("");
    const [chalecheckout, setCheckoutC] = useState("");
    const [chaleStatus, setStatusC] = useState("");

    const [cabanahospede, setHospedeCb] = useState("");
    const [cabanachekin, setCheckinCb] = useState("");
    const [cabanacheckout, setCheckoutCb] = useState("");
    const [cabanaStatus, setStatusCb] = useState("");

    const [domohospede, setHospedeD] = useState("");
    const [domochekin, setCheckinD] = useState("");
    const [domocheckout, setCheckoutD] = useState("");
    const [domoStatus, setStatusD] = useState("");

    const [bushospede, setHospedeB] = useState("");
    const [buschekin, setCheckinB] = useState("");
    const [buscheckout, setCheckoutB] = useState("");
    const [busStatus, setStatusB] = useState("");

    const [estahospede, setHospedeE] = useState("");
    const [estachekin, setCheckinE] = useState("");
    const [estacheckout, setCheckoutE] = useState("");
    const [estaStatus, setStatusE] = useState("");

    useEffect(() => {
        baixarAcomodacoes();
        baixarChale();
        baixarSuite();
        baixarBus();
        baixarCabana();
        baixarDomo();
        baixarEstacionamento();
    }, []);

    async function baixarAcomodacoes() {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/acomodacoes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!resposta.ok) {
                throw new Error('Erro ao buscar infos');
            } else {
                const consulta = await resposta.json();
                if (consulta) {
                    console.log(consulta);
                    setStatusS(consulta[0].id_status_acomodacao);
                    setStatusC(consulta[1].id_status_acomodacao);
                    setStatusCb(consulta[2].id_status_acomodacao);
                    setStatusD(consulta[3].id_status_acomodacao);
                    setStatusB(consulta[4].id_status_acomodacao);
                    setStatusE(consulta[5].id_status_acomodacao)
                } else {
                    console.log('Nenhum dado retornado');
                }
            }
        } catch (error) {
            console.log('Erro ao consultar infos', error);
        }
    }

    async function baixarSuite() {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/suite`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!resposta.ok) {
                throw new Error('Erro ao buscar infos');
            } else {
                const consulta = await resposta.json();
                if (consulta) {
                    setHospedeS(consulta[0].nome_hospede);
                    setCheckinS(consulta[0].checkin);
                    setCheckoutS(consulta[0].checkout);
                } else {
                    console.log('Nenhum dado retornado');
                }
            }
        } catch (error) {
            console.log('Erro ao consultar infos', error);
        }
    }


    async function baixarChale() {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/chale`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!resposta.ok) {
                throw new Error('Erro ao buscar infos');
            } else {
                const consulta = await resposta.json();
                if (consulta) {
                    setHospedeC(consulta[0].nome_hospede);
                    setCheckinC(consulta[0].checkin);
                    setCheckoutC(consulta[0].checkout);
                } else {
                    console.log('Nenhum dado retornado');
                }
            }
        } catch (error) {
            console.log('Erro ao consultar infos', error);
        }
    }
    
    async function baixarCabana() {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/cabana`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!resposta.ok) {
                throw new Error('Erro ao buscar infos');
            } else {
                const consulta = await resposta.json();
                if (consulta) {
                    
                    setHospedeCb(consulta[0].nome_hospede);
                    setCheckinCb(consulta[0].checkin);
                    setCheckoutCb(consulta[0].checkout);
                } else {
                    console.log('Nenhum dado retornado');
                }
            }
        } catch (error) {
            console.log('Erro ao consultar infos', error);
        }
    }
   
    async function baixarDomo() {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/domo`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!resposta.ok) {
                throw new Error('Erro ao buscar infos');
            } else {
                const consulta = await resposta.json();
                if (consulta) {
                    
                    setHospedeD(consulta[0].nome_hospede);
                    setCheckinD(consulta[0].checkin);
                    setCheckoutD(consulta[0].checkout);
                } else {
                    console.log('Nenhum dado retornado');
                }
            }
        } catch (error) {
            console.log('Erro ao consultar infos', error);
        }
    }

    async function baixarBus() {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/bus`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!resposta.ok) {
                throw new Error('Erro ao buscar infos');
            } else {
                const consulta = await resposta.json();
                if (consulta) {
                    
                    setHospedeB(consulta[0].nome_hospede);
                    setCheckinB(consulta[0].checkin);
                    setCheckoutB(consulta[0].checkout);
                } else {
                    console.log('Nenhum dado retornado');
                }
            }
        } catch (error) {
            console.log('Erro ao consultar infos', error);
        }
    }

    async function baixarEstacionamento() {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/estacionamento`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!resposta.ok) {
                throw new Error('Erro ao buscar infos');
            } else {
                const consulta = await resposta.json();
                if (consulta) {
                    
                    setHospedeE(consulta[0].nome_hospede);
                    setCheckinE(consulta[0].checkin);
                    setCheckoutE(consulta[0].checkout);
                } else {
                    console.log('Nenhum dado retornado');
                }
            }
        } catch (error) {
            console.log('Erro ao consultar infos', error);
        }
    }


    // Função que retorna a classe com base no status
    const getCardClass = (id_status_acomodacao) => {
        switch (id_status_acomodacao) {
            case 1:
                return 'card red';
            case 2:
                return 'card orange';
            case 3:
                return 'card green';
            case 4:
                return 'card yellow';
            case 5:
                return 'card purple';
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
                    <div className='cards'>
                        <div className={getCardClass(suiteStatus)}>
                            <div>
                                <h3>Suíte com Cozinha</h3>
                                <p>
                                    <strong>{suitehospede || 'Sem hóspede'}</strong>
                                </p>
                                {suitecheckin && suitecheckout ? (
                                    <p>
                                        {new Date(suitecheckin).toLocaleDateString('pt-BR')} - {new Date(suitecheckout).toLocaleDateString('pt-BR')}
                                    </p>
                                ) : (
                                    <p>Sem datas...</p>
                                )}

                                <br />
                                <div className="icons">
                                    <button className="icon-button" title="Documentos" onClick={() => handleIconClick('documentos')}>&#x1F4C4;</button>
                                    <button className="icon-button" title="Perfil" onClick={() => handleIconClick('perfil')}>&#x1F464;</button>
                                    <button className="icon-button" title="Editar" onClick={() => handleIconClick('editar')}>&#x270F;</button>
                                </div>
                            </div>
                        </div>
                     
                        <div className={getCardClass(chaleStatus)}>
                            <div>
                                <h3>Chalé</h3>
                                <p>
                                    <strong>{chalehospede || 'Sem hóspede'}</strong>
                                </p>
                                {chalechekin && chalecheckout ? (
                                    <p>
                                        {new Date(chalechekin).toLocaleDateString('pt-BR')} - {new Date(chalecheckout).toLocaleDateString('pt-BR')}
                                    </p>
                                ) : (
                                    <p>Sem datas...</p>
                                )}

                                <br />
                                <div className="icons">
                                    <button className="icon-button" title="Documentos" onClick={() => handleIconClick('documentos')}>&#x1F4C4;</button>
                                    <button className="icon-button" title="Perfil" onClick={() => handleIconClick('perfil')}>&#x1F464;</button>
                                    <button className="icon-button" title="Editar" onClick={() => handleIconClick('editar')}>&#x270F;</button>
                                </div>
                            </div>
                        </div>

                        <div className={getCardClass(cabanaStatus)}>
                            <div>
                                <h3>Cabana</h3>
                                <p>
                                    <strong>{cabanahospede || 'Sem hóspede'}</strong>
                                </p>
                                {cabanachekin && cabanacheckout ? (
                                    <p>
                                        {new Date(cabanachekin).toLocaleDateString('pt-BR')} - {new Date(cabanacheckout).toLocaleDateString('pt-BR')}
                                    </p>
                                ) : (
                                    <p>Sem datas...</p>
                                )}

                                <br />
                                <div className="icons">
                                    <button className="icon-button" title="Documentos" onClick={() => handleIconClick('documentos')}>&#x1F4C4;</button>
                                    <button className="icon-button" title="Perfil" onClick={() => handleIconClick('perfil')}>&#x1F464;</button>
                                    <button className="icon-button" title="Editar" onClick={() => handleIconClick('editar')}>&#x270F;</button>
                                </div>
                            </div>
                        </div>

                        <div className={getCardClass(domoStatus)}>
                            <div>
                                <h3>Domo</h3>
                                <p>
                                    <strong>{domohospede || 'Sem hóspede'}</strong>
                                </p>
                                {domochekin && domocheckout ? (
                                    <p>
                                        {new Date(domochekin).toLocaleDateString('pt-BR')} - {new Date(domocheckout).toLocaleDateString('pt-BR')}
                                    </p>
                                ) : (
                                    <p>Sem datas...</p>
                                )}

                                <br />
                                <div className="icons">
                                    <button className="icon-button" title="Documentos" onClick={() => handleIconClick('documentos')}>&#x1F4C4;</button>
                                    <button className="icon-button" title="Perfil" onClick={() => handleIconClick('perfil')}>&#x1F464;</button>
                                    <button className="icon-button" title="Editar" onClick={() => handleIconClick('editar')}>&#x270F;</button>
                                </div>
                            </div>
                        </div>

                        <div className={getCardClass(busStatus)}>
                            <div>
                                <h3>Charrua (Bus)</h3>
                                <p>
                                    <strong>{bushospede || 'Sem hóspede'}</strong>
                                </p>
                                {buschekin && buscheckout ? (
                                    <p>
                                        {new Date(buschekin).toLocaleDateString('pt-BR')} - {new Date(buscheckout).toLocaleDateString('pt-BR')}
                                    </p>
                                ) : (
                                    <p>Sem datas...</p>
                                )}

                                <br />
                                <div className="icons">
                                    <button className="icon-button" title="Documentos" onClick={() => handleIconClick('documentos')}>&#x1F4C4;</button>
                                    <button className="icon-button" title="Perfil" onClick={() => handleIconClick('perfil')}>&#x1F464;</button>
                                    <button className="icon-button" title="Editar" onClick={() => handleIconClick('editar')}>&#x270F;</button>
                                </div>
                            </div>
                        </div>

                        <div className={getCardClass(estaStatus)}>
                            <div>
                                <h3>Estacionamento de Overlands</h3>
                                <p>
                                    <strong>{estahospede || 'Sem hóspede'}</strong>
                                </p>
                                {estachekin && estacheckout ? (
                                    <p>
                                        {new Date(estachekin).toLocaleDateString('pt-BR')} - {new Date(estacheckout).toLocaleDateString('pt-BR')}
                                    </p>
                                ) : (
                                    <p>Sem datas...</p>
                                )}

                                <br />
                                <div className="icons">
                                    <button className="icon-button" title="Documentos" onClick={() => handleIconClick('documentos')}>&#x1F4C4;</button>
                                    <button className="icon-button" title="Perfil" onClick={() => handleIconClick('perfil')}>&#x1F464;</button>
                                    <button className="icon-button" title="Editar" onClick={() => handleIconClick('editar')}>&#x270F;</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Geralmente;


// {renderButtonsBasedOnStatus(chaleStatus)}

// function renderButtonsBasedOnStatus(status) {
//     if (status === 1) {
//         // Se o status for 1, renderiza os ícones e botões
//         return (
//             <div className="icons">
//                 <button className="icon-button" title="Documentos" onClick={() => handleIconClick('documentos')}>&#x1F4C4;</button>
//                 <button className="icon-button" title="Perfil" onClick={() => handleIconClick('perfil')}>&#x1F464;</button>
//                 <button className="icon-button" title="Editar" onClick={() => handleIconClick('editar')}>&#x270F;</button>
//             </div>
//         );
//     } else if (status === 2) {
//         // Se o status for 2, renderiza o botão de ação "Hospedar"
//         return (
//             <button className="action-button" onClick={() => handleActionClick('hospedar')}>Hospedar</button>
//         );
//     }
//     // Se o status não for 1 nem 2, você pode retornar nada ou um estado padrão.
//     return null;
// }