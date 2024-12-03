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

export function verificaTelefHosp(num_celular) {
    const celular = num_celular.trim();
    const telPadrao = /^\d{11}$/; // Formato XXXXXXXXXXX
    let valido = true;

    if (celular === '' || !telPadrao.test(celular)) {
        valido = false;
    } else {
        return valido;
    }
}

export function verificaEmailHosp(email_hospede) {
    const email = email_hospede.trim();
    let valido = true;

    if (email === '' || !email.includes('@')) {
        valido = false;
    } else {
        return valido;
    }
}

export function verificarDataNascimentoHosp(data_nascimento) {
    const dataPadrao2 = /^\d{4}-\d{2}-\d{2}$/;  // Formato dd-mm-yyyy

    // Verifica se a data corresponde a um dos dois formatos
    if (!dataPadrao2.test(data_nascimento)) {
        console.log(1);
        return false; // Se não tiver o formato correto, retorna falso
    }

    const [ano, mes, dia] = data_nascimento.split('-').map(num => parseInt(num, 10));

    const data = new Date(ano, mes - 1, dia);

    if (data.getDate() !== dia || data.getMonth() + 1 !== mes || data.getFullYear() !== ano) {
        console.log(2);
        return false;
    }
    const hoje = new Date();
    const idade = hoje.getFullYear() - ano - (hoje.getMonth() < mes - 1 || (hoje.getMonth() === mes - 1 && hoje.getDate() < dia) ? 1 : 0);

    if (idade < 18) {
        console.log(3);
        return false; // A pessoa deve ter 18 anos ou mais
    }
    return true; // Se passar todas as verificações, retorna true
}

export function verificaCPF(cpf_hospede) {
    if (!validarCPFHosp(cpf_hospede)) return false;
    if (!validacaoRepetidoCPFHosp(cpf_hospede)) return false;
    return validacaoMatCPFHosp(cpf_hospede); // Retorna true ou false com base no cálculo
}

export function validacaoMatCPFHosp(cpf_hospede) {
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

export function validacaoRepetidoCPFHosp(cpf_hospede) {
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

export function validarCPFHosp(cpf_hospede) {
    return typeof cpf_hospede === 'string' && cpf_hospede.length === 11 && /^[0-9]+$/.test(cpf_hospede);
}
