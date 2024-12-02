import { useEffect, useState } from "react";
import styles from './tabelaReserva.module.css';
import { Link } from "react-router-dom";

function TabelaReservas({ tipo, onDeleteSuccess }) {
    const [reservas, setReservas] = useState([]);
    const [filtro, setFiltro] = useState('todos');
    const [pesquisa, setPesquisa] = useState("");  // Estado para armazenar a pesquisa

    useEffect(() => {
        baixarReservas();
    }, []);

    async function baixarReservas() {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/reservas/tabela`, {
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
        const confirmacao = window.confirm("Você tem certeza que deseja deletar essa reserva?");
        if (confirmacao) {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/reservas/${id_reserva}`, {
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

    // Função para filtrar as reservas
    const filtrarReservas = () => {
        // Filtra primeiro pelo status e depois pela pesquisa
        return reservas
            .filter(reserva => {
                if (filtro === 'todos') {
                    return reserva.ativo !== 0;
                } else {
                    return reserva.id_status_reserva === filtro && reserva.ativo !== 0;
                }
            })
            .filter(reserva => {
                // Filtra pelo id_reserva, nome_hospede ou nome_acomodacao
                return (
                    reserva.id_reserva.toString().includes(pesquisa) || // Filtra pelo ID da reserva
                    reserva.nome_hospede.toLowerCase().includes(pesquisa.toLowerCase()) || // Filtra pelo nome do hóspede
                    reserva.nome_acomodacao.toLowerCase().includes(pesquisa.toLowerCase()) // Filtra pelo nome da acomodação
                );
            });
    };

    return (
        <div>
            <div className={`filtroStatus ${styles.filtroStatus}`}>
                <button className={`todos btn ${styles.todos}`} onClick={() => setFiltro('todos')}>Todos</button>
                <button className={`reservado btn ${styles.reservado}`} onClick={() => setFiltro(1)}>Solicitada</button>
                <button className={`hospedado btn ${styles.hospedado}`} onClick={() => setFiltro(2)}>Reservada</button>
                <button className={`emLimpeza btn ${styles.emLimpeza}`} onClick={() => setFiltro(3)}>Hospedada</button>
                <button className={`atrasada btn ${styles.atrasada}`} onClick={() => setFiltro(4)}>Atrasada</button>
                <button className={`finalizado btn ${styles.finalizado}`} onClick={() => setFiltro(5)}>Cancelada</button>
                <button className={`cancelado btn ${styles.cancelado}`} onClick={() => setFiltro(6)}>Finalizada</button>
            </div>

            {/* Barra de pesquisa */}
            <div className={styles.barraPesquisa}>
                <input
                    type="text"
                    placeholder="Pesquisar por ID, hóspede ou acomodação"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}  // Atualiza o estado com o valor digitado
                    className={styles.inputPesquisa}
                />
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
                        {/* Aqui, envolvemos a tbody em uma div com rolamento */}
                        <div className={styles.tabelaBody}>
                            {filtrarReservas().sort((a, b) => b.id_reserva - a.id_reserva).map((reserva) => (
                                <tr key={reserva.id_reserva}>
                                    <td>{reserva.id_reserva}</td>
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
                                            <button className="btn btn-danger btn-sm" onClick={() => deletarReservas(reserva.id_reserva)}>
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

export default TabelaReservas;
