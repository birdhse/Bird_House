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
            const resposta = await fetch('http://localhost:5000/reservas', {
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

    async function deletarReservas(id) {
        try {
            const resposta = await fetch(`http://localhost:5000/reservas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                throw new Error('Erro ao deletar reserva', JSON.stringify(resposta));
            } else {
                setReservas(reservas.filter(reserva => reserva.id !== id));
                onDeleteSuccess();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Função para renderizar o ícone de status com base no valor de status
    const renderStatusIcon = (status) => {
        switch (status) {
            case 'reservado':
                return <span className={`${styles.statusIcon} ${styles.reservado}`} />;
            case 'hospedado':
                return <span className={`${styles.statusIcon} ${styles.hospedado}`} />;
            case 'em limpeza':
                return <span className={`${styles.statusIcon} ${styles.emLimpeza}`} />;
            case 'bloqueado':
                return <span className={`${styles.statusIcon} ${styles.bloqueado}`} />;
            case 'finalizado':
                return <span className={`${styles.statusIcon} ${styles.finalizado}`} />;
            case 'cancelado':
                return <span className={`${styles.statusIcon} ${styles.cancelado}`} />;
            case 'atrasado':
                return <span className={`${styles.statusIcon} ${styles.atrasado}`} />;
            case 'vencido':
                return <span className={`${styles.statusIcon} ${styles.vencido}`} />;
            default:
                return <span className={styles.statusIcon} />;
        }
    }

    const filtrarReservas = () => {
        if (filtro === 'todos') {
            return reservas;
        } else {
            return reservas.filter(reserva => reserva.status === filtro);
        }
    };

    return (
        <div>
            <div className={`filtroStatus ${styles.filtroStatus}`}>
                <button className={`todos btn ${styles.todos}`} onClick={() => setFiltro('todos')}>Todos</button>
                <button className={`reservado btn ${styles.reservado}`} onClick={() => setFiltro('reservado')}>Reservado</button>
                <button className={`hospedado btn ${styles.hospedado}`} onClick={() => setFiltro('hospedado')}>Hospedado</button>
                <button className={`emLimpeza btn ${styles.emLimpeza}`} onClick={() => setFiltro('em limpeza')}>Em Limpeza</button>
                <button className={`bloqueado btn ${styles.bloqueado}`} onClick={() => setFiltro('bloqueado')}>Bloqueado</button>
                <button className={`finalizado btn ${styles.finalizado}`} onClick={() => setFiltro('finalizado')}>Finalizado</button>
                <button className={`cancelado btn ${styles.cancelado}`} onClick={() => setFiltro('cancelado')}>Cancelado</button>
                <button className={`atrasado btn ${styles.atrasado}`} onClick={() => setFiltro('atrasado')}>Atrasado</button>
                <button className={`vencido btn ${styles.vencido}`} onClick={() => setFiltro('vencido')}>Vencido</button>
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
                            <tr key={reserva.id}>
                                <td>{reserva.id}</td>
                                {/* Aqui está a chamada da função renderStatusIcon */}
                                <td>{renderStatusIcon(reserva.id_status)}</td>
                                <td>{reserva.id_hospede}</td>
                                <td>{reserva.id_acomodacao}</td>
                                <td>{reserva.checkin}</td>
                                <td>{reserva.checkout}</td>
                                <td>{reserva.qntd_hospedes}</td>
                                {tipo === 'edit' &&
                                    <td className={styles.acaoBtn}>
                                        <Link to={`/edit_reserva/${reserva.idd}`} className="btn btn-warning btn-sm">
                                            Editar
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deletarReservas(reserva.id)}
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TabelaReservas;
