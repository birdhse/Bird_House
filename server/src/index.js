import express from 'express'
import cors from 'cors'

import { criarReserva, excluirReserva, mostrarReservas, atualizarReserva, mostrarUmaReserva, mostrarTabelaReservas } from './Controllers/ReservaController.js';
import { atualizarHospede, criarHospede, excluirHospede, mostrarHospedes, mostrarUmHospede } from './Controllers/HospedeController.js'
import { mostrarTabelaUsuarios, atualizarUsuario, criarUsuario, excluirUsuario, logarUsuario, mostrarUmUsuario, mostrarUsuarios } from "./Controllers/UsuarioController.js";
import { atualizarUmUsuario } from "./Controllers/ConfigUsuController.js";


const app = express();
const porta = 5000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/",(req,res)=>{
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

app.get('/config_usuarios/:id_usuario', mostrarUmUsuario)
app.put("/config_usuarios/:id_usuario",atualizarUmUsuario)


app.listen(porta, () => {
  console.log(`API Rodando na porta ${porta}`)
});

///////////////////////////////////////

import mysql from 'mysql2/promise';
import db from './conexao.js'; // Configuração da conexão com o banco de dados


const conexao = mysql.createPool(db);

app.use(cors()); // Permite requisições do frontend

// Rota para obter reservas por acomodação
app.get('/api/reservas_por_acomodacao', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = `
        SELECT COUNT(r.id_reserva) AS count, a.nome_acomodacao
        FROM reservas AS r
        JOIN acomodacoes AS a ON r.id_acomodacao = a.id_acomodacao
    `;
    const queryParams = [];

    if (startDate && endDate) {
        query += ` WHERE r.data_reserva BETWEEN ? AND ? `;
        queryParams.push(startDate, endDate);
    }

    query += ` GROUP BY r.id_acomodacao`;

    const [qtde_acomodacao] = await conexao.query(query, queryParams);

    if (qtde_acomodacao.length > 0) {
        return res.status(200).json(qtde_acomodacao);
    } else {
        return res.status(404).send('Nenhum dado encontrado.');
    }
} catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    return res.status(500).send('Erro ao obter os dados.');
}
});


// Rota para obter reservas por hóspede
app.get('/api/reservas_por_hospede', async (req, res) => {
  try {
      const { startDate, endDate } = req.query;
      let query = `
          SELECT COUNT(r.id_hospede) AS count, h.nome_hospede
          FROM reservas AS r
          JOIN hospedes AS h ON r.id_hospede = h.id_hospede
      `;
      const queryParams = [];

      if (startDate && endDate) {
          query += ` WHERE r.data_reserva BETWEEN ? AND ? `;
          queryParams.push(startDate, endDate);
      }

      query += ` GROUP BY r.id_hospede`;

      const [qtde_hospede] = await conexao.query(query, queryParams);

      if (qtde_hospede.length > 0) {
          return res.status(200).json(qtde_hospede);
      } else {
          return res.status(404).send('Nenhum dado encontrado.');
      }
  } catch (error) {
      console.error('Erro ao consultar o banco de dados:', error);
      return res.status(500).send('Erro ao obter os dados.');
  }
});




// // Inicia o servidor
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });
