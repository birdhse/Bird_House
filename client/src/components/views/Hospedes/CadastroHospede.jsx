import FormHospede from "./FormHospede";
import Menu from "../../layout/menu"

function CadastroHospede() {

  async function cadastrarHospede(infoHospede) {
    try {
      const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/hospedes`, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(infoHospede)
      });
      if (!resposta.ok) {
        return 'erro';
      }
      else {
        console.log('Hospede cadastrado')
        return 'cadastrada';
      }
    } catch (error) {
      console.error('Erro ao cadastrar', error)
    }
  }

  return (
    <div>
      <Menu />
      <FormHospede titulo='Cadastrar Hospede'
      textoBotao='Cadastrar'
      handleSubmit={cadastrarHospede}
      tipo='cadastrada'/>
    </div>

  )
}

export default CadastroHospede