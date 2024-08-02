import HospedeModel from "../Models/HospedeModel.js";

class HospedeController{
    constructor(){

    }
    create(req,res){
        const nome_h = req.body.nome_h
        const cpf_h = req.body.cpf_h
        const dtnasc_h = req.body.dtnasc_h
        const contato_h = req.body.contato_h
        HospedeModel.create(nome_h,cpf_h,dtnasc_h,contato_h).then(
            resposta =>{
                console.debug("Cadastrando hospede")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta =>{
                console.debug(resposta)
                console>debug("Erro cadastrando hospede")
                res.satus(resposta[0]).json(resposta[1])
            }
        )
    }
    read(req,res){
        HospedeModel.read().then(
            resposta =>{
            console.debug("Exibindo hospede")
            res.status(resposta[0]).json(resposta[1])
           } 
        ).catch(
            resposta =>{
                console.debug(resposta)
                console.debug("Erro exibindo um hospede")
                res.status(resposta[0]).json(resposta[0])
            }
        )
    }
    update(req,res){
        const id_h = req.params.id_h
        const nome_h = req.body.nome_h
        const cpf_h = req.body.cpf_h
        const dtnasc_h = req.body.dtnasc_h
        const contato_h = req.body.contato_h
        HospedeModel.update(id_h,nome_h,cpf_h,dtnasc_h,contato_h).then(
            resposta =>{
                console.debug("Atualizando hospede")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta =>{
                console.debug(resposta)
                console.debug("Erro: atualizando um hospede")
            }
        )
    }
    delete(req,res){
        const id_h =req.params.id_h
        HospedeModel.delete(id_h).then(
            resposta =>{
                console.debug("Deletando hospede")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta =>{
            console.debug(resposta)
            console.debug("Erro Deletando uma categoria")
            res.status(resposta[0]).json(resposta[1])   
            }
            
        )

    }
}
export default new HospedeController();