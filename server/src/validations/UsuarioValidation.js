const propriedades = [
    'nome_usuario',
    'email_usuario',
    'login_usuario',
    'senha',
    'id_cargo'
]

export function hasProperty(usuario) {
    return propriedades.every(prop => usuario.hasOwnProperty(prop));
}

export function isNullOrEmpty(valor) {
    return valor === null || valor === '' || valor === undefined;
}

export function verificaUsuario(usuario) {
    return propriedades.some(prop => isNullOrEmpty(usuario[prop]));
}
