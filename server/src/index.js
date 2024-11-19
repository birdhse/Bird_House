import express from "express"
import cors from 'cors'

import {criaReserva,excluirReserva,mostrarReservas,atualizarReserva,mostrarUmaReserva} from './Controllers/ReservaController.js';
import {atualizarHospede, criarHospede, excluirHospede, mostrarHospede, mostrarUmHospede} from './Controllers/HospedeController.js'
import { atualizarUsuario, criarUsuario, excluirUsuario, mostrarUmUsuario, mostrarUsuario } from "./Controllers/UsuarioController.js";

const app = express();
const porta = 5000;

app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
  res.status(200).json("Servidor funcionando")
});



app.post("/reservas",criaReserva)
app.get("/reservas",mostrarReservas)
app.put("/reservas/:id_reserva",atualizarReserva)
app.delete("/reservas/:id_reserva",excluirReserva)
app.get('/reservas/:id_reserva', mostrarUmaReserva)

app.post("/hospedes",criarHospede)
app.get("/hospedes",mostrarHospede)
app.put("/hospedes/:id_hospede",atualizarHospede)
app.delete("/hospedes/:id_hospede",excluirHospede)
app.get('/hospedes/:id_hospede', mostrarUmHospede)

app.post("/usuarios",criarUsuario)
app.get("/usuarios",mostrarUsuario)
app.put("/usuarios/:id_usuario",atualizarUsuario)
app.delete("/usuarios/:id_usuario",excluirUsuario)
app.get('/usuarios/:id_usuario', mostrarUmUsuario)

app.listen(porta, () => {
  console.log(`API Rodando na porta ${porta}`)
});
