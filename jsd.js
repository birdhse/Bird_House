document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    atualizarReserva();
});

document.getElementById('confirmButton').addEventListener('click', function() {
    alert("Reserva confirmada.");
});

document.getElementById('cancelButton').addEventListener('click', function() {
    cancelarReserva();
});

document.getElementById('checkInDate').addEventListener('change', calcularValorDiaria);
document.getElementById('checkOutDate').addEventListener('change', calcularValorDiaria);

function calcularValorDiaria() {
    const checkInDate = new Date(document.getElementById('checkInDate').value);
    const checkOutDate = new Date(document.getElementById('checkOutDate').value);
    const oneDay = 24 * 60 * 60 * 1000;
    const numDiarias = Math.round((checkOutDate - checkInDate) / oneDay);

    if (numDiarias > 0) {
        const dailyRate = parseFloat(document.getElementById('dailyRate').value);
        const totalDiarias = dailyRate * numDiarias;
        document.getElementById('totalAmount').value = totalDiarias.toFixed(2);
    } else {
        document.getElementById('totalAmount').value = '0.00';
    }
}

function cancelarReserva() {
    alert("Reserva cancelada.");
}

function atualizarReserva() {
    alert("Reserva atualizada.");
}
