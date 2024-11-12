const propriedades = [
    'nome_hospede',
    'num_celular',
    'email_hospede',
    'data_nascimento',
    'cpf_hospede'
];

export function hasProperty(hospede) {
    return propriedades.every(prop => hospede.hasOwnProperty(prop));
}

export function isNullOrEmpty(valor) {
    return valor === null || valor === '' || valor === undefined;
}

export function verificaHospede(hospede) {
    return propriedades.some(prop => isNullOrEmpty(hospede[prop]));
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

export function verificaEmail(email_hospede) {
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

export function verificarDataNascimento(data_nascimento) {
    const dataPadrao = /^\d{2}\/\d{2}\/\d{4}$/;

    // Verifica o formato "dd/mm/aaaa"
    if (!dataPadrao.test(data_nascimento)) {
        return false;
    }

    // Divide a data em dia, mês e ano
    const [dia, mes, ano] = data_nascimento.split('/').map(num => parseInt(num, 10));

    // Cria um objeto Date com a data informada
    const data = new Date(ano, mes - 1, dia); // Mês é de 0 a 11 em JavaScript

    // Valida se a data criada é igual à data inserida (para excluir datas inexistentes como 31/02)
    if (
        data.getFullYear() !== ano ||
        data.getMonth() !== mes - 1 ||
        data.getDate() !== dia
    ) {
        return false;
    }

    // Verifica se a idade está entre 0 e 120 anos
    const hoje = new Date();
    const idade = hoje.getFullYear() - ano - (hoje.getMonth() < mes - 1 || (hoje.getMonth() === mes - 1 && hoje.getDate() < dia) ? 1 : 0);
    if (idade < 0 || idade > 120) {
        return false;
    }

    return true;
}

export function validacaoMatCPF(cpf_hospede) {
    let digito1 = 0;
    let digito2 = 0;
    let validoCPF = false;

    if (cpf_hospede.length === 11) {
        digito1 = parseInt(cpf_hospede.substring(0, 1)) * 10;
        digito1 = parseInt(cpf_hospede.substring(1, 2)) * 9 + digito1;
        digito1 = parseInt(cpf_hospede.substring(2, 3)) * 8 + digito1;
        digito1 = parseInt(cpf_hospede.substring(3, 4)) * 7 + digito1;
        digito1 = parseInt(cpf_hospede.substring(4, 5)) * 6 + digito1;
        digito1 = parseInt(cpf_hospede.substring(5, 6)) * 5 + digito1;
        digito1 = parseInt(cpf_hospede.substring(6, 7)) * 4 + digito1;
        digito1 = parseInt(cpf_hospede.substring(7, 8)) * 3 + digito1;
        digito1 = parseInt(cpf_hospede.substring(8, 9)) * 2 + digito1;
        digito1 = 11 - (digito1 % 11);

        if (digito1 > 9) {
            digito1 = 0;
        }

        digito2 += parseInt(cpf_hospede.substring(0, 1)) * 11;
        digito2 += parseInt(cpf_hospede.substring(1, 2)) * 10;
        digito2 += parseInt(cpf_hospede.substring(2, 3)) * 9;
        digito2 += parseInt(cpf_hospede.substring(3, 4)) * 8;
        digito2 += parseInt(cpf_hospede.substring(4, 5)) * 7;
        digito2 += parseInt(cpf_hospede.substring(5, 6)) * 6;
        digito2 += parseInt(cpf_hospede.substring(6, 7)) * 5;
        digito2 += parseInt(cpf_hospede.substring(7, 8)) * 4;
        digito2 += parseInt(cpf_hospede.substring(8, 9)) * 3;
        digito2 += digito1 * 2;
        digito2 = 11 - (digito2 % 11) <= 9 ? 11 - (digito2 % 11) : 0;

        validoCPF = parseInt(cpf_hospede.substring(9, 11)) === digito1 * 10 + digito2;

        return validoCPF;
    } else {
        return false;
    }
}

export function validacaoRepetidoCPF(cpf_hospede) {
    return !(
        cpf_hospede === '00000000000' ||
        cpf_hospede === '11111111111' ||
        cpf_hospede === '22222222222' ||
        cpf_hospede === '33333333333' ||
        cpf_hospede === '44444444444' ||
        cpf_hospede === '55555555555' ||
        cpf_hospede === '66666666666' ||
        cpf_hospede === '77777777777' ||
        cpf_hospede === '88888888888' ||
        cpf_hospede === '99999999999'
    );
}

export function validarCPF(cpf_hospede) {
    return typeof cpf_hospede === 'string' && cpf_hospede.length === 11 && /^[0-9]+$/.test(cpf_hospede);
}
