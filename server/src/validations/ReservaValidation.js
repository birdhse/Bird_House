import mysql from "mysql2/promise";
import db from "../conexao.js";

const propriedades = [
    'id_status_reserva',
    'id_hospede',
    'id_acomodacao',
    'checkin',
    'checkout',
    'qntd_hospedes',
    'valor_total'
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