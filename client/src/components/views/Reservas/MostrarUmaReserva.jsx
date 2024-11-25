import FormReserva from "../../forms/FormReserva";
import Menu from "../../layout/menu"

import { useParams } from "react-router-dom";

function ExibirReserva() {
  const {id_reserva} = useParams();

  async function exibirReserva(infoReserva, id_reserva) {
    try {
      const resposta = await fetch(`http://localhost:5000/reservas/${id_reserva}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(infoReserva)
      });
      if(!resposta.ok){
        const retorno = await resposta.json();
        console.log('Erro ao exibir Reserva',retorno);
        return 'erro';
      }
      else{
        console.log('Reserva Exibida');
        return 'erro';        
      }
    } catch (error) {
      console.log('Erro ao exibir reserva', error);
    }
  }
  return (
    <div>
      <Menu/>
      <FormReserva titulo='Editar Reserva' 
      textoBotao='Salvar' id_reserva={id_reserva} 
      handleSubmit={exibirReserva}
      TextoValor= 'Valor Total:'/>
    </div>
        
        
  )
}

export default ExibirReserva