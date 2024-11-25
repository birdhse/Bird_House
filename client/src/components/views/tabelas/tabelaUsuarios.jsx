import { useEffect, useState } from "react";
import styles from './tabelaUsuarios.module.css';
import { Link } from "react-router-dom";

function tabelaUsuarios({ tipo, OnDeleteSucess}) {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        baixarUsuarios();
    }, []);

    async function baixarUsuarios() {
        try {
            const resposta = await fetch(`http://localhost:5000/usuarios`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                throw new Error('Erro ao buscar usua´rio');
            }
            const consulta = await resposta.json();
            setHospedes(consulta);
        } catch (error) {
            console.log('Erro ao consultar usuário', error);
        }
    }


    return (
        <div>
            <div className={`${styles.tabelaUsuarios} ${tipo === 'edit' ? styles.edit : ''}`}>
                <table className={`table table-bordered ${styles.tabelaUsuarios}`}>
                    <thead>
                        <tr>
                            <th>Nome Completo</th>
                            <th>E-mail</th>
                            <th>Função</th>
                            <th>Status</th>
                            {tipo === 'edit' && <th>Mais Informações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.}</td>
                                <td>{usuario.}</td>
                                <td>{usuario.}</td>
                                <td>{usuario.}</td>
                                {tipo === 'edit' && (
                                    <td className={styles.acaoBtn}>
                                        <Link to={`/edit_usuario/${usuario.id}`} className="btn btn-warning btn-sm">
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

export default tabelaUsuarios;
