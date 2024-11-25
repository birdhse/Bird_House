import { useEffect, useState } from "react";
import styles from './tabelaReserva.module.css';
import { Link } from "react-router-dom";

function TabelaReservas({tipo, onDeleteSuccess}) {
    const [reservas, setReservas] = useState([]);
    const [filtro, setFiltro] = useState('todos');

    useEffect(() => {
        baixarReservas();
    }, []);

    async function baixarReservas() {
        try {
            const resposta = await fetch('http://localhost:5000/reservas/tabela', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta) {
                throw new Error('Erro ao buscar reservas');
            }
            const consulta = await resposta.json();
            setReservas(consulta);
        } catch (error) {
            console.log('Erro ao consultar reservas', error);
        }
    }

    async function deletarReservas(id_reserva) {
        try {
            const resposta = await fetch(`http://localhost:5000/reservas/${id_reserva}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                throw new Error('Erro ao deletar reserva', JSON.stringify(resposta));
            } else {
                setReservas(reservas.filter(reserva => reserva.id_reserva !== id_reserva));
                onDeleteSuccess();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Função para renderizar o ícone de status com base no valor de status
    const renderStatusIcon = (id_status_reserva) => {
        switch (id_status_reserva) {
            case 1:
                return <span className={`${styles.statusIcon} ${styles.solicitada}`} />;
            case 2:
                return <span className={`${styles.statusIcon} ${styles.reservada}`} />;
            case 3:
                return <span className={`${styles.statusIcon} ${styles.hospedada}`} />;
            case 4:
                return <span className={`${styles.statusIcon} ${styles.atrasada}`} />;
            case 5:
                return <span className={`${styles.statusIcon} ${styles.cancelada}`} />;
            case 6:
                return <span className={`${styles.statusIcon} ${styles.finalizada}`} />;
            default:
                return <span className={styles.statusIcon} />;
        }
    }

    const filtrarReservas = () => {
        if (filtro === 'todos') {
            return reservas.filter(reserva => reserva.id_status_reserva !== 7);
        } else {
            return reservas.filter(reserva => reserva.id_status_reserva === filtro);
        }
    };

    return (
        <div>
            <div className={`filtroStatus ${styles.filtroStatus}`}>
                <button className={`todos btn ${styles.todos}`} onClick={() => setFiltro('todos')}>Todos</button>
                <button className={`reservado btn ${styles.reservado}`} onClick={() => setFiltro(1)}>Solicitada</button>
                <button className={`hospedado btn ${styles.hospedado}`} onClick={() => setFiltro(2)}>Reservada</button>
                <button className={`emLimpeza btn ${styles.emLimpeza}`} onClick={() => setFiltro(3)}>Hospedada</button>
                <button className={`bloqueado btn ${styles.bloqueado}`} onClick={() => setFiltro(4)}>Atrasada</button>
                <button className={`finalizado btn ${styles.finalizado}`} onClick={() => setFiltro(5)}>Cancelada</button>
                <button className={`cancelado btn ${styles.cancelado}`} onClick={() => setFiltro(6)}>Finalizada</button>
            </div>

            <div className={`${styles.tabelaReservas} ${tipo === 'edit' ? styles.edit : ''}`}>
                <table className={`table table-bordered ${styles.tabelaReservas}`}>
                    <thead>
                        <tr>
                            <th>Nº</th>
                            <th>Status</th>
                            <th>Hóspede</th>
                            <th>Acomodação</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Qtd</th>
                            {tipo === 'edit' && <th>Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filtrarReservas().map((reserva) => (
                            <tr key={reserva.id_reserva}>
                                <td>{reserva.id_reserva}</td>
                                {/* Aqui está a chamada da função renderStatusIcon */}
                                <td>{renderStatusIcon(reserva.id_status_reserva)}</td>
                                <td>{reserva.nome_hospede}</td>
                                <td>{reserva.nome_acomodacao}</td>
                                <td>{new Date(reserva.checkin).toLocaleDateString('pt-BR')}</td>
                                <td>{new Date(reserva.checkout).toLocaleDateString('pt-BR')}</td>
                                <td>{reserva.qntd_hospedes}</td>
                                {tipo === 'edit' && (
                                    <td className={styles.acaoBtn}>
                                        <Link to={`/edit_reserva/${reserva.id_reserva}`} className="btn btn-warning btn-sm">
                                            Editar
                                        </Link>
                                        <Link to={`/info_reserva/${reserva.id_reserva}`} className="btn btn-primary btn-sm">Mais Info</Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => deletarReservas(reserva.id_reserva)}>
                                            Deletar
                                        </button>
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

export default TabelaReservas;
