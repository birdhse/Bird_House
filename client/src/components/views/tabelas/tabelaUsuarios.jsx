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
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/usuarios`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                throw new Error('Erro ao buscar usuário');
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
                            <th>Login</th>
                            <th>Função</th>
                            {tipo === 'edit' && <th>Mais Informações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id_usuario}>
                                <td>{usuario.nome_usuario}</td>
                                <td>{usuario.email_usuario}</td>
                                <td>{usuario.login_usuario}</td>
                                <td>{usuario.id_cargo}</td>
                                {tipo === 'edit' && (
                                    <td className={styles.acaoBtn}>
                                        <Link to={`/edit_usuario/${usuario.id_usuario}`} className="btn btn-warning btn-sm">
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
