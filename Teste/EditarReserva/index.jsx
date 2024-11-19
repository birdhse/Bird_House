import React from 'react'
import Menu from '../../client/src/components/layout/menu'

function EditarReserva() {
    return (
        <div>
            <Menu/>

            <div>
                <div class="containerReserva">
                    <h2>Confirmar Reserva</h2>
                    <form id="reservationForm">
                        <label for="roomStatus">Situação do Quarto:</label>
                        <select id="roomStatus select" name="roomStatus" required>
                            <option value="hospedado">Hospedado</option>
                            <option value="nao-hospedado">Não Hospedado</option>
                        </select>

                        <label for="guestName">Hóspede:</label>
                        <input type="text" id="guestName" name="guestName" required></input>

                        <label for="stayPeriod">Entrada:</label>
                        <input type="date" id="checkInDate" name="checkInDate" required></input>
                        <label for="stayPeriod">Saída:</label>
                        <input type="date" id="checkOutDate" name="checkOutDate" required></input>

                        <label for="roomNumber">Unidade Habitacional:</label>
                        <select id="roomNumber" name="roomNumber" required>
                            <option value="suite-cozinha">Suíte com Cozinha</option>
                            <option value="chale-familia">Chalé Família</option>
                            <option value="cabana">Cabana</option>
                            <option value="domo">Domo</option>
                            <option value="bus">Bus</option>
                            <option value="estacionamento-overlands">Estacionamento de Overlands</option>
                        </select>

                        <label for="dailyRate">Valor da Diária (em R$):</label>
                        <input type="number" id="dailyRate" name="dailyRate" min="0" step="0.01" required></input>

                        <label for="numberOfGuests">Nº de Hóspedes:</label>
                        <input type="number" id="numberOfGuests" name="numberOfGuests" required></input>

                        <label for="numberOfChildren">Nº de Crianças:</label>
                        <input type="number" id="numberOfChildren" name="numberOfChildren" required></input>

                        <label for="observation">Observação:</label>
                        <textarea id="observation" name="observation"></textarea>

                        <div id="buttons">
                            <button type="button" id="cancelButton" class="purple">Cancelar</button>
                            <button type="submit" id="updateButton" class="green">Atualizar Reserva</button>
                        </div>
                    </form>
                </div>

                <div id="resumo_reserva">
                    <h3>Resumo da Reserva</h3>
                    <div id="resumo">
                        <p><strong>Método de Pagamento:</strong> Dinheiro</p>
                        <p><strong>Número de Diárias:</strong> 3</p>
                        <p><strong>Média de Diárias:</strong> R$ 150,00</p>
                        <p><strong>Diárias:</strong> R$ 450,00</p>
                        <p><strong>Extras:</strong> R$ 50,00</p>
                        <p><strong>Valor Total:</strong> R$ 600,00</p>
                        <p><strong>Recebido:</strong> R$ 600,00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarReserva


