import ReservaModel from "../Models/ReservaModel.js";

class ReservaController{
    constructor(){

    }
    create(req,res){
        const id_r = req.body.id_r
        const dt_entrada = req.body.dt_entrada
        const dt_saida = req.body.dt_saida
        const uh = req.body.uh
        const valor_diaria = req.body.valor_diaria
        const num_h = req.body.num_h
        const id_h = req.body.id_h
        const status = req.body.status
        ReservaModel.create(id_r,dt_entrada,dt_saida,uh,valor_diaria,num_h,id_h,status).then(
            resposta =>{
                console.debug("Cadastrando uma reserva")
                res.status(resposta[0]).json(resposta[1])                
            }
        ).catch(
            resposta =>{
                console.debug(resposta)
                console.debug("Erro cadastrando uma reserva")
                res.status(resposta[0]).json(resposta[1])                
            }
        )

    }
    read(req,res){
        ReservaModel.read().then(
           resposta =>{
               console.debug("Exibindo reservas")
               res.status(resposta[0]).json(resposta[1])                
           }
       ).catch(
           resposta =>{
               console.debug(resposta)
               console.debug("Erro ao exibir reservas")
               res.status(resposta[0]).json(resposta[1])                
           }
       )

   }
   update(req,res){
        const id_r = req.params.id_r
        const dt_entrada = req.body.dt_entrada
        const dt_saida = req.body.dt_saida
        const uh = req.body.uh
        const valor_diaria = req.body.valor_diaria
        const num_h = req.body.num_h
        const id_h = req.body.id_h
        const status = req.body.status
    ReservaModel.update(id_r,dt_entrada,dt_saida,uh,valor_diaria,num_h,id_h,status).then(
       resposta =>{
           console.debug("Atualizando reserva")
           res.status(resposta[0]).json(resposta[1])                
       }
   ).catch(
       resposta =>{
           console.debug(resposta)
           console.debug("Erro Atualizando reserva")
           res.status(resposta[0]).json(resposta[1])                
       }
   )

}
delete(req,res){
    const id_r= req.params.id_r
   ReservaModel.delete(id_r).then(
       resposta =>{
           console.debug("Deletando reserva")
           res.status(resposta[0]).json(resposta[1])                
       }
   ).catch(
       resposta =>{
           console.debug(resposta)
           console.debug("Erro Deletando um reserva")
           res.status(resposta[0]).json(resposta[1])                
       }
   )

}
}

export default new ReservaController();