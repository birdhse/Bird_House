import express from "express"
import HospedeController from './Controllers/hospedeController.js';
const client = express()

client.use(express.json())

client.get("/",(req,res)=>{
  res.status(200).json("Servidor funcionando")
})

client.post("/cad_hosped", HospedeController.create)
client.get("/cad_hosped", HospedeController.read)
client.put("/cad_hosped/:nome_h",HospedeController.update)
client.delete("/cad_hosped/:nome_h",HospedeController.delete)

/*
client.post("/pedidos",PedidosController.create)
client.get("/pedidos",PedidosController.read)
client.put("/pedidos/:id_pedido",PedidosController.update)
client.delete("/pedidos/:id_pedido",PedidosController.delete)*/

client.listen(5000)