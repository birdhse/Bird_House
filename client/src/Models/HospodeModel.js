import mysql from "mysql2"
import config from "../Config.js"

class HospedeModel{
    constructor(){
        this.conexao = mysql.createConnection(config.db);
        console.debug("Conectado")
    }
    create(nome_h,cpf_h,dtnasc_h,contato_h){
        let sql = `insert into cad_hosped values("${nome_h}","${cpf_h}", "${dtnasc_h}","${contato_h}");`
        
        return new Promise((resolve, reject)=>{
            this.conexao.query(sql,(erro, retorno)=>{
                if(erro){
                    reject([400, erro])
                }
                resolve([201, "Hospede Adicionado!"])
            })
        });
    }
    read(req,res){
        let sql = `select * from cad_hosped;`
        
        return new Promise((resolve,reject)=>{
            this.conexao.query(sql,(erro,retorno)=>{
                if(erro){
                    console.debug(erro)
                    reject([400, erro])
                }
                resolve([200,retorno])
            })
        });
    }
    update(nome_h,cpf_h,dtnasc_h,contato_h){
        let sql = `update cad_hosped set nome_h="${nome_h}",cpf_h="${cpf_h}",dtnasc_h="${dtnasc_h}",contato_h="${contato_h}" where nome_h="${nome_h}";`

        return new Promise((resolve,reject)=>{
            this.conexao.query(sql,(erro,retorno)=>{
                if(erro){
                    console.debug(erro)
                    reject([400, erro])
                }
                resolve([200, "Atualizado"])
            })
        });
        
    }
    delete(nome_h){
        let sql = `delete from cad_hosped where nome_h="${nome_h}";`
        return new Promise((resolve, reject)=>{
            this.conexao.query(sql,(erro,retorno) => {
                if(erro){
                    console.debug(erro)
                    reject([400,erro])
                }
                resolve([200,"Deletado"])
            });
        });
    }
}

export default new HospedeModel();