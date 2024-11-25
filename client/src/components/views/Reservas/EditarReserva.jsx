import FormReserva from "../../forms/FormReserva";
import Menu from "../../layout/menu"

import { useParams } from "react-router-dom";

function EditReserva() {
  const {id_reserva} = useParams();

  async function editarReserva(infoReserva, id_reserva) {
    try {
      const resposta = await fetch(`http://localhost:5000/reservas/${id_reserva}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(infoReserva)
      });
      if(!resposta.ok){
        const retorno = await resposta.json();
        console.log('Erro ao editar Reserva',retorno);
        return 'erro';
      }
      else{
        console.log('Reserva Editada');
        return 'editada';
        
      }
    } catch (error) {
      console.log('Erro ao editar reserva', error);
    }
  }
  return (
    <div>
      <Menu/>
      <FormReserva titulo='Editar Reserva' 
      textoBotao='Salvar' id_reserva={id_reserva} 
      handleSubmit={editarReserva}
      TextoValor= 'Valor Total:'/>
    </div>
        
        
  )
}

export default EditReserva