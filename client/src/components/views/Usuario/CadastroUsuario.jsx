import FormUsuario from "../../forms/FormUsuario"
import Menu from "../../layout/menu"

function CadastroUsuario() {

  async function cadastrarUsuario(infoUsuario) {
    try {
      const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/usuarios`, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(infoUsuario)
      });
      if (!resposta.ok) {
        return 'erro';
      }
      else {
        console.log('Usuario cadastrado')
        return 'cadastrada';
      }
    } catch (error) {
      console.error('Erro ao cadastrar', error)
    }
  }

  return (
    <div>
      <Menu />
      <FormUsuario titulo='Cadastrar Usuario'
      textoBotao='Cadastrar'
      handleSubmit={cadastrarUsuario}/>
    </div>

  )
}

export default CadastroUsuario