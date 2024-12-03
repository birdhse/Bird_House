import FormUsuario from "../../forms/FormUsuario"
import Menu from "../../layout/menu"

import { useParams } from "react-router-dom";

function EditUsuario() {
  const {id_usuario} = useParams();

  async function editarUsuario(infoUsuario, id_usuario) {
    try {
      const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/usuarios/${id_usuario}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(infoUsuario)
      });
      if(!resposta.ok){
        const retorno = await resposta.json();
        console.log('Erro ao editar Usuario',retorno);
        return 'erro';
      }
      else{
        console.log('Usuario Editada');
        return 'editada';
        
      }
    } catch (error) {
      console.log('Erro ao editar Usuario', error);
    }
  }
  return (
    <div>
      <Menu/>
      <FormUsuario titulo='Editar Usuario' 
      textoBotao='Salvar' id_usuario={id_usuario} 
      handleSubmit={editarUsuario}/>
    </div>
        
  )
}

export default EditUsuario