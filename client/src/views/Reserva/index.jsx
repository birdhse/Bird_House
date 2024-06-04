import React from 'react'

function Reserva() {
    return (
        <div>
            <div id="navegacao">
                <div id="area_menu">
                    <h1 id="logo">Bird House</h1>
                    <input type="text" id="txtBusca" placeholder="Buscar..." />
                    <label id="data">23/04/2024</label>
                    <span class="material-symbols-outlined">notifications</span>
                </div>
            </div>

            <div id="menu_lateral">
                <ul>
                    <li><a href="/">Geral</a></li>
                    <li><a href="mapa.html">Mapa</a></li>
                    <li class="link_ativo"><a href="/reserva">Reservas</a></li>
                    <li><a href="/cadastro">Cadastros</a></li>
                    <li><a href="link5.htm">Transações</a></li>
                </ul>
            </div>

            <div>
                <div class="containerReserva">
                    <h2>Geral / Reservas</h2>
                    <input type="text" placeholder=" Pesquise por UH, nome do hóspede ou número de reserva"></input>
                    <div class="botoes">
                        <button id="corTodos">Todos</button>
                        <button id="corReservado">Reservado</button>
                        <button id="corHospedado">Hospedado</button>
                        <button id="corFinalizado">Finalizado</button>
                        <button id="corCancelado">Cancelado</button>
                        <button id="corAtrasado">Atrasado</button>
                        <button id="corVencido">Vencido</button>
                    </div>
                </div>

                <table>
                    <tr>
                        <th colspan="6">Lista de Reserva (<label id="lReserva">10</label>)</th>
                    </tr>
                    <tr>
                        <td>N°</td>
                        <td>Hóspede</td>
                        <td>Acomodações</td>
                        <td>Check-in</td>
                        <td>Check-out</td>
                        <td >Qntd.</td>
                    </tr>
                    <tr>
                        <td><a href="/editreserva"><label id="txtReservado">■</label> HQ:00001</a></td>
                        <td>Isaac</td>
                        <td>Bus</td>
                        <td>24/10/2023</td>
                        <td>25/10/2023</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td><a href="/editreserva"><label id="txtHospedado">■</label> HQ:00001</a></td>
                        <td>Matheus</td>
                        <td>Suíte com cozinha</td>
                        <td>24/10/2023</td>
                        <td>26/10/2023</td>
                        <td>1</td>
                    </tr>
                </table>
            </div >
        </div >
    )
}
export default Reserva