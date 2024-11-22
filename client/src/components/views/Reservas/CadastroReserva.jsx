import FormReserva from "../../forms/FormReserva";
import Menu from "../../layout/menu"

function CadastroReserva() {

  async function cadastrarReserva(infoReserva) {
    try {
      const resposta = await fetch('http://localhost:5000/reservas', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(infoReserva)
      });
      if (!resposta.ok) {
        console.log('Erro ao cadastrar')
      }
      else {
        console.log('Reserva cadastrada')
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
      tipo='cadastrada'
      TextoValor='Desconto:'/>
    </div>

  )
}

export default CadastroReserva