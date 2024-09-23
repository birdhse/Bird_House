import React from 'react'
import Menu from '../../layout/menu'

function Geral() {
    return (
        <div>
            <Menu/>

            <div class="container">

                <div class="main-content">

                    <div class="header">
                        <h2>24/10/2023</h2>
                        <div class="status">
                            <span>Todos: 6</span>
                            <span>Disponível: 0</span>
                            <span>Ocupado: 1</span>
                            <span>Em limpeza: 1</span>
                            <span>Bloqueado: 1</span>
                            <span>Entra hoje: 1</span>
                            <span>Sai hoje: 1</span>
                            <span>Atrasado: 1</span>
                            <span>Vencido: 0</span>
                        </div>
                    </div>

                    <div class="cards">
                        <div class="card red">
                            <h3>Suíte com Cozinha</h3>
                            <p><strong>Matheus Sarti Brunelli</strong></p>
                            <p>24/10/2023 - 25/10/2023</p>
                            <div class="icons">
                                <span>&#x24;</span>
                                <span>&#x1F4C4;</span>
                                <span>&#x1F464;</span>
                                <span>&#x270F;</span>
                            </div>
                        </div>

                        <div class="card grey">
                            <h3>Chalé Família</h3>
                            <p><strong>Pietro</strong></p>
                            <p>18/10/2023 - 24/10/2023</p>
                            <button>Liberar</button>
                        </div>

                        <div class="card purple">
                            <h3>Cabana</h3>
                            <p><strong>Amanda Xavier</strong></p>
                            <p>20/10/2023 - 28/10/2023</p>
                            <button>Hospedar</button>
                        </div>

                        <div class="card green">
                            <h3>Estacionamento de Overlands</h3>
                            <p><strong>Pietro</strong></p>
                            <p>20/10/2023 - 24/10/2023</p>
                            <div class="icons">
                                <span>&#x24;</span>
                                <span>&#x1F4C4;</span>
                                <span>&#x1F464;</span>
                                <span>&#x270F;</span>
                            </div>
                        </div>

                        <div class="card yellow">
                            <h3>Bus</h3>
                            <p><strong>Isaac</strong></p>
                            <p>24/10/2023 - 25/10/2023</p>
                            <button>Hospedar</button>
                        </div>

                        <div class="card orange">
                            <h3>Domo</h3>
                            <p><strong>xxxx</strong></p>
                            <p>24/10/2023 - 25/10/2023</p>
                            <button>Hospedar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Geral