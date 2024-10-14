function AbreviaNome(props){
    let nome = new String(props.instrutor).split(' ');
    nome = nome[0]+' '+nome[nome.length-1];
    return (nome);
}

export default AbreviaNome;