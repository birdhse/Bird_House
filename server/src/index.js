import express from "express"
import cors from 'cors'

import {criarReserva,excluirReserva,mostrarReservas,atualizarReserva,mostrarUmaReserva} from './Controllers/ReservaController.js';
import { mostrarHospedes } from "./Controllers/HospedeController.js";

const app = express();
const porta = 5000;

app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
  res.status(200).json("Servidor funcionando")
});



app.post("/reservas",criarReserva)
app.get("/reservas",mostrarReservas)
app.put("/reservas/:id_reserva",atualizarReserva)
app.delete("/reservas/:id_reserva",excluirReserva)
app.get('/reservas/:id_reserva', mostrarUmaReserva)

app.get("/hospedes", mostrarHospedes)

app.listen(porta, () => {
  console.log(`API Rodando na porta ${porta}`)
});
