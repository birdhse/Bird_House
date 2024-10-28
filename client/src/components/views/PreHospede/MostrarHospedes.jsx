import { useEffect, useState } from "react";
import styles from 'mostrarHospedes.module.css';
import { Link } from "react-router-dom";

function MostrarHospedes({ id, tipo }) {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        baixarReservas();
    }, [id]);

    async function baixarReservas() {
        try {
            const resposta = await fetch(`http://localhost:5000/cadastro/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                throw new Error('Erro ao buscar hóspede');
            }
            const consulta = await resposta.json();
            setReservas(consulta);
        } catch (error) {
            console.log('Erro ao consultar hóspede', error);
        }
    }


    return (
        <div>
            <div className={`${styles.mostrarHospedes} ${tipo === 'edit' ? styles.edit : ''}`}>
                <table className={`table table-bordered ${styles.mostrarHospedes}`}>
                    <thead>
                        <tr>
                            <th>Nº</th>
                            <th>Hóspede</th>
                            <th>E-mail</th>
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                            <th>Contato</th>
                            {tipo === 'edit' && <th>Mais Informações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {MostrarHospedes().map((hospedes) => (
                            <tr key={hospedes.id}>
                                <td>{hospedes.id}</td>
                                <td>{hospedes.id_hospede}</td>
                                <td>{hospedes.nome_hospede}</td>
                                <td>{hospedes.num_celular}</td>
                                <td>{hospedes.email_hospede}</td>
                                <td>{hospedes.data_nascimento}</td>
                                <td>{hospedes.cpf_hospede}</td>
                                {tipo === 'edit' && (
                                    <td className={styles.acaoBtn}>
                                        <Link to={`/edit_reserva/${hospedes.id}`} className="btn btn-warning btn-sm">
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

export default MostrarHospedes;
