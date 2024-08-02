import express from "express"
import HospedeController from './Controllers/HospedeController.js';
import ReservaController from "./Controllers/ReservaController.js";
const server = express()

server.use(express.json())

server.get("/",(req,res)=>{
  res.status(200).json("Servidor funcionando")
})

server.post("/cad_hosped", HospedeController.create)
server.get("/cad_hosped", HospedeController.read)
server.put("/cad_hosped/:id_h",HospedeController.update)
server.delete("/cad_hosped/:id_h",HospedeController.delete)


server.post("/cad_reservas",ReservaController.create)
server.get("/cad_reservas",ReservaController.read)
server.put("cad_reservas/:id_r",ReservaController.update)
server.delete("/cad_reservas/:id_r",ReservaController.delete)

server.listen(5000)