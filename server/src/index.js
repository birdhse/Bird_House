import express from "express"
import cors from 'cors'

import {criarReserva,excluirReserva,mostrarReservas,atualizarReserva,mostrarUmaReserva, mostrarTabelaReservas} from './Controllers/ReservaController.js';
import {atualizarHospede, criarHospede, excluirHospede, mostrarHospedes, mostrarUmHospede} from './Controllers/HospedeController.js'
import { atualizarUsuario, criarUsuario, excluirUsuario, mostrarUmUsuario, mostrarUsuarios } from "./Controllers/UsuarioController.js";

const app = express();
const porta = 5000;

app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
  res.status(200).json("Servidor funcionando")
});



app.post("/reservas",criarReserva)
app.get("/reservas",mostrarReservas)
app.get("/reservas/tabela",mostrarTabelaReservas)
app.put("/reservas/:id_reserva",atualizarReserva)
app.delete("/reservas/:id_reserva",excluirReserva)
app.get('/reservas/:id_reserva', mostrarUmaReserva)

app.post("/hospedes",criarHospede)
app.get("/hospedes",mostrarHospedes)
app.put("/hospedes/:id_hospede",atualizarHospede)
app.delete("/hospedes/:id_hospede",excluirHospede)
app.get('/hospedes/:id_hospede', mostrarUmHospede)

app.post("/usuarios",criarUsuario)
app.get("/usuarios",mostrarUsuarios)
app.put("/usuarios/:id_hospede",atualizarUsuario)
app.delete("/usuarios/:id_hospede",excluirUsuario)
app.get('/usuarios/:id_hospede', mostrarUmUsuario)

app.listen(porta, () => {
  console.log(`API Rodando na porta ${porta}`)
});
