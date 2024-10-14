import { useEffect, useState } from "react";
import styles from './tabelaReserva.module.css';
import { Link } from "react-router-dom";
import AbreviaNome from "./AbreviaNome";


function TabelaReservas({tipo, onDeleteSuccess}) {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        baixarReservas();

    }, [])

    async function baixarReservas() {
        try {
            const resposta = await fetch('http://localhost:5000/reservas', {
                method: 'GET',
                headers: {
                    'Content-Type': 'applicatio/json'
                }
            });

            if (!resposta) {
                throw new Error('Erro ao buscar reservas');
            }
            const consulta = await resposta.json();
            setReservas(consulta);
        } catch (error) {
            console.log('Erro ao consultar reservas', error)

        }
    }
        async function deletarReservas(id) {
            try {
                const resposta = await fetch(`http://localhost:5000/reservas/${id}`,{
                    method:'DELETE',
                    headers:{
                        'Content-Type':'applicatio/json'
                    }
                })

                if (!resposta.ok) {
                    throw new Error('Erro ao deletar reserva', JSON.stringify(resposta))     
                }
                else{
                    setReservas(reservas.filter(reserva=>reserva.id !== id));
                    onDeleteSuccess();
                }
            } catch (error) {
                console.log(error);
            }
        }
    return (
        <div className={`${styles.tabelaReservas}${tipo === 'edit' ? styles.edit : ''}`}>
            <table className={styles.tabelaReservas}>
                <thead>
                    <tr>
                        <th>Nº</th>
                        <th>Status</th>
                        <th>Hóspede</th>
                        <th>Acomodação</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Qntd</th>
                        {tipo === 'edit' && <th>Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva.id}>
                            <td>{reserva.id}</td>
                            <td>{reserva.status}</td>
                            <td>{reserva.hospede}</td>
                            <td>{reserva.acomodacao}</td>
                            <td>{reserva.checkin}</td>
                            <td>{reserva.checkout}</td>
                            <td>{reserva.qntd}</td>
                            {tipo === 'edit' &&
                                <td>
                                    <Link to={`/edit_reserva/${reserva.id}`}className="btn btn-warning">Editar</Link>
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={()=>deletarReservas(reserva.id)}
                                    >Deletar</button>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TabelaReservas;