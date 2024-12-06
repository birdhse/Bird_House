import db from "./conexao.js";
const conexao = mysql.createPool(db);
import mysql from "mysql2/promise"

export const getReservasPorAcomodacao = async (req, res) => {
    try {
        const query = `
            SELECT COUNT(r.id_acomodacao) AS count, a.nome_acomodacao 
            FROM reservas AS r
            JOIN acomodacoes AS a ON r.id_acomodacao = a.id_acomodacao
            GROUP BY r.id_acomodacao
        `;

        const [qtde_acomodacao] = await conexao.query(query);

        if (qtde_acomodacao.length > 0) {
            return res.status(200).json(qtde_acomodacao);
        } else {
            return res.status(404).json({ message: 'Nenhum dado encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao obter os dados:', error);
        return res.status(500).json({ message: 'Erro ao obter os dados.' });
    }
};
