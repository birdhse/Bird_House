import FormHosp from "../../forms/FormEditHosp";
import Menu from "../../layout/menu"
import { useState } from "react";
import { useParams } from "react-router-dom";

function EditHospede() {
  const {id} = useParams();

  async function editarHospedde(infoHospede, id_hospede) {
    try {
      const resposta = await fetch(`http://localhost:5000/hospedes/${id_hospede}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(infoHospede)
      });
      if(!resposta.ok){
        const retorno = await resposta.json();
        console.log('Erro ao editar Hospede',retorno);
      }
      else{
        console.log('Hospede Editada');
        
      }
    } catch (error) {
      console.log('Erro ao editar hospede', error);
    }
  }
  return (
    <div>
      <Menu/>
      <FormHosp titulo='Editar Hospede' 
      textoBotao='Salvar' id={id_hospede} 
      handleSubmit={editarHospedde}
      tipo='editada'/>
    </div>
        
        
  )
}

export default EditHospede