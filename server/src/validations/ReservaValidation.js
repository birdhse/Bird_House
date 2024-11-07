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