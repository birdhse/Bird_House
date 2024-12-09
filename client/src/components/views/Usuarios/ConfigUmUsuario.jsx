import { useParams } from "react-router-dom";
import ConfigUsuario from "./FormConfigUsuario";
import Menu from "../../layout/menu"


function EditUmUsuario() {

  const { id_usuario } = useParams();
  console.log('id_usuario');
  async function editarUmUsuario(infoUsuario, id_usuario) {
    try {
      const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/config_usuarios/${id_usuario}`, {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(infoUsuario)
      });
      if (!resposta.ok) {
        console.log(infoUsuario);

        const retorno = await resposta.json();
        console.log(id_usuario);

        console.log('Erro ao editar Usuario', retorno);
        return 'erro';
      }
      else {
        console.log(id_usuario);
        console.log(infoUsuario);
        console.log('Usuario Editada');
        return 'editada';

      }
    } catch (error) {
      console.log(infoUsuario);
      console.log(id_usuario);

      console.log('Erro ao editar Usuario', error);
    }
  }

  return (
    <div>
      <Menu />
      <ConfigUsuario
        id_usuario={id_usuario}
        handleSubmit={editarUmUsuario} />
    </div>

  )

}
export default EditUmUsuario