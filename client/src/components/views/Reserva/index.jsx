import React from 'react'
import Menu from '../../layout/menu'

function Reservas() {
    return (
        <div>
            <Menu/>

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
                    <tr >
                        <td colspan="6">Lista de Reserva (10)</td>
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
export default Reservas