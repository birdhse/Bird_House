import { useEffect, useState } from "react";
import styles from './tabelaHospede.module.css';
import { Link } from "react-router-dom";

function TabelaHospedes({ tipo, OnDeleteSucess}) {
    const [hospedes, setHospedes] = useState([]);

    useEffect(() => {
        baixarHospedes();
    }, []);

    async function baixarHospedes() {
        try {
            const resposta = await fetch(`http://localhost:5000/hospedes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                throw new Error('Erro ao buscar hóspede');
            }
            const consulta = await resposta.json();
            setHospedes(consulta);
        } catch (error) {
            console.log('Erro ao consultar hóspede', error);
        }
    }


    return (
        <div>
            <div className={`${styles.TabelaHospedes} ${tipo === 'edit' ? styles.edit : ''}`}>
                <table className={`table table-bordered ${styles.TabelaHospedes}`}>
                    <thead>
                        <tr>
                            <th>Nº</th>
                            <th>Hóspede</th>
                            <th>Contato</th>
                            <th>E-mail</th>
                            <th>Data de Nascimento</th>
                            <th>CPF</th>
                            {tipo === 'edit' && <th>Mais Informações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {hospedes.map((hospede) => (
                            <tr key={hospede.id}>
                                <td>{hospede.id_hospede}</td>
                                <td>{hospede.nome_hospede}</td>
                                <td>{hospede.num_celular}</td>
                                <td>{hospede.email_hospede}</td>
                                <td>{new Date(hospede.data_nascimento).toLocaleDateString('pt-BR')}</td>
                                <td>{hospede.cpf_hospede}</td>
                                {tipo === 'edit' && (
                                    <td className={styles.acaoBtn}>
                                        <Link to={`/edit_hospede/${hospede.id}`} className="btn btn-warning btn-sm">
                                            Editar
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TabelaHospedes;
