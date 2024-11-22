import React from 'react';
import Menu from '../../layout/menu';
import './Geral.modules.css';

function Geral() {
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
                        <button className="status-button pending" onClick={() => handleActionClick('Pendente')}>Pendente</button>
                        <button className="status-button unavailable" onClick={() => handleActionClick('Indisponível')}>Indisponível</button>
                        <button className="status-button available" onClick={() => handleActionClick('Disponível')}>Disponível</button>
                        <button className="status-button maintenance" onClick={() => handleActionClick('Manutenção')}>Manutenção</button>
                        <button className="status-button cleaning" onClick={() => handleActionClick('Em Limpeza')}>Em limpeza</button>
                    </div>

                    {/* Cards de Acomodações */}
                    <div className="cards">
                        <div className="card red">
                            <h3>Suíte com Cozinha</h3>
                            <p><strong>Matheus Sarti Brunelli</strong></p>
                            <p>24/10/2023 - 25/10/2023</p>
                            <div className="icons">
                                <button className="icon-button" onClick={() => handleIconClick('documentos')}>&#x1F4C4;</button>
                                <button className="icon-button" onClick={() => handleIconClick('perfil')}>&#x1F464;</button>
                                <button className="icon-button" onClick={() => handleIconClick('editar')}>&#x270F;</button>
                            </div>
                        </div>

                        <div className="card green_two">
                            <h3>Chalé Família</h3>
                            <p><strong>Pietro</strong></p>
                            <p>18/10/2023 - 24/10/2023</p>
                            <button className="action-button" onClick={() => handleActionClick('liberar')}>Liberar</button>
                        </div>

                        <div className="card purple">
                            <h3>Cabana</h3>
                            <p><strong>Amanda Xavier</strong></p>
                            <p>20/10/2023 - 28/10/2023</p>
                            <button className="action-button" onClick={() => handleActionClick('hospedar')}>Hospedar</button>
                        </div>

                        <div className="card green">
                            <h3>Estacionamento de Overlands</h3>
                            <p><strong>Pietro</strong></p>
                            <p>20/10/2023 - 24/10/2023</p>
                            <div className="icons">
                                <button className="icon-button" onClick={() => handleIconClick('documentos')}>&#x1F4C4;</button>
                                <button className="icon-button" onClick={() => handleIconClick('perfil')}>&#x1F464;</button>
                                <button className="icon-button" onClick={() => handleIconClick('editar')}>&#x270F;</button>
                            </div>
                        </div>

                        <div className="card yellow">
                            <h3>Bus</h3>
                            <p><strong>Isaac</strong></p>
                            <p>24/10/2023 - 25/10/2023</p>
                            <button className="action-button" onClick={() => handleActionClick('hospedar')}>Hospedar</button>
                        </div>

                        <div className="card orange">
                            <h3>Domo</h3>
                            <p><strong>xxxx</strong></p>
                            <p>24/10/2023 - 25/10/2023</p>
                            <button className="action-button" onClick={() => handleActionClick('hospedar')}>Hospedar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Geral;

