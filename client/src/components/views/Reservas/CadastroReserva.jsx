import FormReserva from "./FormReserva";
import Menu from "../../layout/menu"

function CadastroReserva() {

  async function cadastrarReserva(infoReserva) {
    try {
      const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/reservas`, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(infoReserva)
      });
      if (!resposta.ok) {
        return 'erro';
      }
      else {
        console.log('Reserva cadastrada')
        return 'cadastrada';
      }
    } catch (error) {
      console.error('Erro ao cadastrar', error)
    }
  }

  return (
    <div>
      <Menu />
      <FormReserva titulo='Cadastrar Reserva'
      textoBotao='Cadastrar'
      handleSubmit={cadastrarReserva}
      TextoValor='Desconto:'/>
    </div>

  )
}

export default CadastroReserva