import mysql from "mysql2"
import config from "../Config.js"

class ReservaModel{
    constructor(){
        this.conexao = mysql.createConnection(config.db)
        console.debug("Conectado")
    }
    create(id_r,dt_entrada,dt_saida,uh,valor_diaria,num_h,id_h,status){
        let sql = `insert into cad_reservas values("${id_r}","${dt_entrada}","${dt_saida}","${uh}","${valor_diaria}","${num_h}","${id_h}","${status}");`

        return new Promise((resolve, reject)=>{
            this.conexao.query(sql,(erro,retorno)=>{
                if(erro){
                    console.debug(erro)
                    reject([400,erro])
                }
                resolve([201,"Reserva inserida"])
            }) 
        });
    }
    read(){
        let sql = `select * from cad_reservas;`
        return new Promise((resolve,reject)=>{
            this.conexao.query(sql,(erro,retorno)=>{
                if(erro){
                    console.debug(erro)
                    reject([400,erro])
                }
                resolve([200,retorno])
            })
        });
         
    }
    update(id_r,dt_entrada,dt_saida,uh,valor_diaria,num_h,id_h,status){
        let sql =`update cad_reservas set dt_entrada="${dt_entrada}", dt_saida="${dt_saida}", uh="${uh}",valor_diaria="${valor_diaria}",num_h="${num_h}",id_h="${id_h}",status="${status}" where id_r="${id_r}";`
        return new Promise ((resolve, reject)=>{
            this.conexao.query(sql,(erro,retorno)=>{
                if(erro){
                    console.debug(erro)
                    reject([400,erro])
                }
                resolve([200,"Reserva Atualizada"])
            })
        });       
    }
     delete(id_r){
        let sql = `delete from cad_reservas where id_r="${id_r}";`
        return new Promise((resolve,reject)=>{
            this.conexao.query(sql,(erro,retorno)=>{
                if(erro){
                    console.debug(erro)
                    reject([400,erro])
                }
                resolve([200,"Reserva deletada"])
            })
        });
     }
}




export default new ReservaModel();