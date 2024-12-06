const propriedades = [
    'email_usuario',
    'senha'
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

export function verificaEmail(email_usuario) {
    email_usuario = document.getElementById('email_usuario').value.trim();
    let valido = true;

    if (email_usuario === '' || !email_usuario.includes('@')) {
        document.getElementById('alerta-email').style.visibility = 'visible';
        valido = false;
    } else {
        document.getElementById('alerta-email').style.visibility = 'hidden';
    }

    return valido;
}