document.addEventListener('DOMContentLoaded', function() {
    const dailyRateInput = document.getElementById('dailyRate');
    const checkInDateInput = document.getElementById('checkInDate');
    const checkOutDateInput = document.getElementById('checkOutDate');
    const totalAmountInput = document.getElementById('totalAmount');

    dailyRateInput.addEventListener('input', updateTotalAmount);
    checkInDateInput.addEventListener('input', updateTotalAmount);
    checkOutDateInput.addEventListener('input', updateTotalAmount);

    function updateTotalAmount() {
        const dailyRate = parseFloat(dailyRateInput.value) || 0;
        const checkInDate = new Date(checkInDateInput.value);
        const checkOutDate = new Date(checkOutDateInput.value);
        const numberOfDays = (checkOutDate - checkInDate) / (1000 * 3600 * 24);
        const totalAmount = dailyRate * numberOfDays || 0;
        totalAmountInput.value = totalAmount.toFixed(2);
    }
});
