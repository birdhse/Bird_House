import express from "express"
import cors from 'cors'

import { criarReserva, excluirReserva, mostrarReservas, atualizarReserva, mostrarUmaReserva, mostrarTabelaReservas } from './Controllers/ReservaController.js';
import { atualizarHospede, criarHospede, excluirHospede, mostrarHospedes, mostrarUmHospede } from './Controllers/HospedeController.js'
import { mostrarTabelaUsuarios, atualizarUsuario, criarUsuario, excluirUsuario, logarUsuario, mostrarUmUsuario, mostrarUsuarios } from "./Controllers/UsuarioController.js";
import { mostrarInfos } from "./Controllers/AcomodacoesController.js";

const app = express();
const porta = 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json("Servidor funcionando")
});

app.post('/login', logarUsuario)

app.post("/reservas", criarReserva)
app.get("/reservas", mostrarReservas)
app.get("/reservas/tabela", mostrarTabelaReservas)
app.put("/reservas/:id_reserva", atualizarReserva)
app.delete("/reservas/:id_reserva", excluirReserva)
app.get('/reservas/:id_reserva', mostrarUmaReserva)

app.post("/hospedes", criarHospede)
app.get("/hospedes", mostrarHospedes)
app.put("/hospedes/:id_hospede", atualizarHospede)
app.delete("/hospedes/:id_hospede", excluirHospede)
app.get('/hospedes/:id_hospede', mostrarUmHospede)

app.post("/usuarios", criarUsuario)
app.get("/usuarios", mostrarUsuarios)
app.get("/usuarios/tabela", mostrarTabelaUsuarios)
app.put("/usuarios/:id_usuario", atualizarUsuario)
app.delete("/usuarios/:id_usuario", excluirUsuario)
app.get('/usuarios/:id_usuario', mostrarUmUsuario)


app.get('/geral',mostrarInfos);



app.listen(porta, () => {
  console.log(`API Rodando na porta ${porta}`)
});

///////////////////////////////////////

import db from "./conexao.js";
const conexao = mysql.createPool(db);
import mysql from "mysql2/promise"

app.get('/api/reservas_por_acomodacao', async (req, res) => {
  const resposta = `
      SELECT COUNT(r.id_acomodacao) AS count, a.nome_acomodacao 
      FROM reservas AS r
      JOIN acomodacoes AS a ON r.id_acomodacao = a.id_acomodacao
      GROUP BY r.id_acomodacao
  `;

  const [qtde_acomodacao] = await conexao.query(resposta);

  if (qtde_acomodacao.length > 0) {
    return res.status(200).json(qtde_acomodacao);
  } else {
    return res.status(500).send('Erro ao obter os dados.');
  }

});


