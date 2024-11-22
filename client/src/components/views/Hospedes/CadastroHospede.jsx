import FormHosp from "../../forms/FormEditHosp";
import Menu from "../../layout/menu"
import { useState } from "react";

function CadastroHospede() {

  async function cadastrarHospede(infoHospede) {
    try {
      const resposta = await fetch('http://localhost:5000/hospedes', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(infoHospede)
      });
      if (!resposta.ok) {
        console.log('Erro ao cadastrar')
      }
      else {
        console.log('hospede cadastrado')
      }
    } catch (error) {
      console.error('Erro ao cadastrar', error)
    }
  }

  return (
    <div>
      <Menu />
      <FormHosp titulo='Cadastrar Hospede'
      textoBotao='Cadastrar'
      handleSubmit={cadastrarHospede}
      tipo='cadastrada'/>
    </div>

  )
}

export default CadastroHospede