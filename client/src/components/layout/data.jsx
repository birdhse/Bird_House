import { useEffect, useState } from "react";

//Declarando função 'Data'
function Data(){
    //Declarando 'hora' como estado
    const [data,setData] = useState('');

    //Chamando função pós carregamento
    useEffect(()=>{
        //Chamando função de Atualizar Horário primeira vez
        atualizaData();
        
        //Declarando intervalo de 1 segundo para atualizar relógio
        const intervalo = setInterval(atualizaData,1000);
        return()=>{
            clearInterval(intervalo);
        }
    },[]);

    //Declarando função que atribui a hora a hora minutos e segundos atuais
    function atualizaData(){
        //Declarando Objeto do tipo Date
        const hoje = new Date();
        //Pegando hora minutos e segundos

        const dataCompleta = hoje.getDate() + '/'+(hoje.getMonth()+1)+'/'+hoje.getFullYear();
        //Atualizando o estado hora para hora minutos e segundos atuais
        setData(dataCompleta);
    }
    return(
        //Retornando uma div com a hora minutos e segundos de forma correta
        <div>
            {data}
        </div>
    )
}

export default Data;