import express from "express"
import cors from 'cors'

import {criaReserva,excluirReserva,mostrarReservas,atualizarReserva,mostrarUmaReserva} from './Controllers/ReservaController.js';

const app = express();
const porta = 5000;

app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
  res.status(200).json("Servidor funcionando")
});



server.post("/reservas",criaReserva)
server.get("/reservas",mostrarReservas)
server.put("reservas/:id_r",atualizarReserva)
server.delete("/reservas/:id_r",excluirReserva)
app.get('/reservas/:id', mostrarUmaReserva)

app.listen(porta, () => {
  console.log(`API Rodando na porta ${porta}`)
});
