import { useEffect, useState } from "react";

//Declarando função 'Data'
function Data() {
    //Declarando 'hora' como estado
    const [data, setData] = useState('');

    //Chamando função pós carregamento
    useEffect(() => {
        //Chamando função de Atualizar Horário primeira vez
        atualizaData();

        //Declarando intervalo de 1 segundo para atualizar relógio
        const intervalo = setInterval(atualizaData, 1000);
        return () => {
            clearInterval(intervalo);
        }
    }, []);

    //Declarando função que atribui a hora a hora minutos e segundos atuais
    function atualizaData() {
        let data = new Date();
        let diaHoje = ("0" + data.getDate()).slice(-2);
        let mesHoje = ("0" + (data.getMonth() + 1)).slice(-2);
        let anoHoje = data.getFullYear();

        const hoje = diaHoje + '/' + mesHoje + '/' + anoHoje;
        setData(hoje);
    }
    return (
        <div>
            {data}
        </div>
    )
}

export default Data;