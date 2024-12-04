import { useEffect, useState } from "react";
import styles from './tabelaHospede.module.css';
import { Link } from "react-router-dom";

function TabelaHospedes({ tipo, OnDeleteSucess }) {
    const [hospedes, setHospedes] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {
        baixarHospedes();
    }, []);

    async function baixarHospedes() {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/hospedes`, {
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

    async function deletarHospedes(id_hospede) {
        const confirmacao = window.confirm("Você tem certeza que deseja deletar essa hospede?");
        if (confirmacao) {
            try {
                const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/hospedes/${id_hospede}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!resposta.ok) {
                    throw new Error('Erro ao deletar hospede', JSON.stringify(resposta));
                } else {
                    setHospedes(hospedes.filter(hospede => hospede.id_hospede !== id_hospede));
                    OnDeleteSucess();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const filtrarHospedes = () => {
        return hospedes.filter(hospede => hospede.ativo !== 0)
            .filter(hospede => {
                // Filtra pelo id_reserva, nome_hospede ou nome_acomodacao
                return (
                    hospede.cpf_hospede.toString().includes(pesquisa) || // Filtra pelo CPF do hóspede
                    hospede.nome_hospede.toLowerCase().includes(pesquisa.toLowerCase())// Filtra pelo nome do hóspede
                );
            });
    };

    return (
        <div>
            <div className={styles.barraPesquisa}>
                <input
                    type="text"
                    placeholder="Pesquisar por nome e cpf"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}  // Atualiza o estado com o valor digitado
                    className={styles.inputPesquisa}
                />
            </div>
            <br />
            <div className={`${styles.tabelaHospedes} ${tipo === 'edit' ? styles.edit : ''}`}>
                <table className={`table table-bordered ${styles.tabelaHospedes}`}>
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
                    <div className={styles.tabelaBody}>
                        {filtrarHospedes().sort((a, b) => b.id_hospede - a.id_hospede).map((hospede) => (
                            <tr key={hospede.id}>
                                <td>{hospede.id_hospede}</td>
                                <td>{hospede.nome_hospede}</td>
                                <td>{hospede.num_celular}</td>
                                <td>{hospede.email_hospede}</td>
                                <td>{new Date(hospede.data_nascimento).toLocaleDateString('pt-BR')}</td>
                                <td>{hospede.cpf_hospede}</td>
                                {tipo === 'edit' && (
                                    <td className={styles.acaoBtn}>
                                        <Link to={`/edit_hospede/${hospede.id_hospede}`} className="btn btn-warning btn-sm">
                                            Editar
                                        </Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => deletarHospedes(hospede.id_hospede)}>
                                            Deletar
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TabelaHospedes;
