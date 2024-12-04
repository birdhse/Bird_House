import FormHospede from "./FormHospede";
import Menu from "../../layout/menu"
import { useParams } from "react-router-dom";

function EditHospede() {
  const {id_hospede} = useParams();

  async function editarHospede(infoHospede, id_hospede) {
    try {
      const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/hospedes/${id_hospede}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(infoHospede)
      });
      if(!resposta.ok){
        const retorno = await resposta.json();
        console.log('Erro ao editar Hospede',retorno);
        return 'erro';
      }
      else{
        console.log('Hospede Editado');
        return 'editada';
      }
    } catch (error) {
      console.log('Erro ao editar hospede', error);
    }
  }
  return (
    <div>
      <Menu/>
      <FormHospede titulo='Editar Hospede' 
      textoBotao='Salvar' id_hospede={id_hospede} 
      handleSubmit={editarHospede}
      tipo='editada'/>
    </div>
        
        
  )
}

export default EditHospede