const propriedades = [
    'nome_hospede',
    'num_celular',
    'email_hospede',
    'data_nascimento',
    'cpf_hospede'
];

export function hasProperty(hospede) {
    return propriedades.every(prop=>hospede.hasOwnProperty(prop));
}

export function isNullOrEmpty(valor) {
    return valor === null || valor === '' || valor === undefined;
}

export function verificaHospede(hospede) {
    return propriedades.some(prop=>isNullOrEmpty(hospede[prop]));
}