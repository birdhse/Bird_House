const propriedades = [
    'nome_hospede',
    'num_celular',
    'email_hospede',
    'data_nascimento',
    'cpf_hospede'
];

export function hasProperty(reserva) {
    return propriedades.every(prop=>reserva.hasOwnProperty(prop));
}

export function isNullOrEmpty(valor) {
    return valor === null || valor === '' || valor === undefined;
}

export function verificaReserva(reserva) {
    return propriedades.some(prop=>isNullOrEmpty(reserva[prop]));
}

export function verificaTelef(num_celular) {
    num_celular = document.getElementById('num_celular').value.trim();
    const telPadrao = /^\d{11}$/; // Formato XXXXXXXXXXX
    let valido = true;

    if (num_celular === '' || !telPadrao.test(num_celular)) {
        document.getElementById('alerta-telef').style.visibility = 'visible';
        valido = false;
    } else {
        document.getElementById('alerta-telef').style.visibility = 'hidden';
    }

    return valido;
}

export function verificaTelef(email_hospede) {
    email_hospede = document.getElementById('email_hospede').value.trim();
    let valido = true;

    if (email_hospede === '' || !email_hospede.includes('@')) {
        document.getElementById('alerta-email').style.visibility = 'visible';
        valido = false;
    } else {
        document.getElementById('alerta-email').style.visibility = 'hidden';
    }

    return valido;
}
