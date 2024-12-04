import { useEffect, useState } from "react";
import styles from './tabelaUsuarios.module.css';
import { Link } from "react-router-dom";

function TabelaUsuarios({ tipo, OnDeleteSucess }) {
    const [usuarios, setUsuarios] = useState([]);
    const [pesquisa, setPesquisa] = useState("");  // Estado para armazenar a pesquisa
    useEffect(() => {
        baixarUsuarios();
    }, []);

    const filtrarUsuarios = () => {
        return usuarios
            .filter(usuario => usuario.ativo !== 0) // Filtra pelo status
            .filter(usuario => {
                return (
                    usuario.nome_usuario.toLowerCase().includes(pesquisa.toLowerCase()) || 
                    usuario.login_usuario.toLowerCase().includes(pesquisa.toLowerCase())
                );
            });
    };
    

    async function baixarUsuarios() {
        try {
            const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/usuarios/tabela`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                throw new Error('Erro ao buscar usuário');
            }
            const consulta = await resposta.json();
            setUsuarios(consulta);
        } catch (error) {
            console.log('Erro ao consultar usuário', error);
        }
    }

    async function deletarUsuarios(id_usuario) {
        const confirmacao = window.confirm("Você tem certeza que deseja inativar esse usuário?");
        if (confirmacao) {
            try {
                const resposta = await fetch(`${process.env.REACT_APP_BACKEND}/usuarios/${id_usuario}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!resposta.ok) {
                    throw new Error('Erro ao deletar usuario', JSON.stringify(resposta));
                } else {
                    setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== id_usuario));
                    OnDeleteSucess();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }



    return (


        <div>
            <div className={styles.barraPesquisa}>
                <input
                    type="text"
                    placeholder="Pesquisar por Usuário ou Login"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}  // Atualiza o estado com o valor digitado
                    className={styles.inputPesquisa}
                />
            </div>
            <br/>
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
                    <div className={styles.tabelaBody}>
                    {filtrarUsuarios().sort((a, b) => b.id_usuario - a.id_usuario).map((usuario) => (
                            <tr key={usuario.id_usuario}>
                                <td>{usuario.nome_usuario}</td>
                                <td>{usuario.email_usuario}</td>
                                <td>{usuario.login_usuario}</td>
                                <td>{usuario.nome_cargo}</td>
                                {tipo === 'edit' && (
                                    <td className={styles.acaoBtn}>
                                        <Link to={`/edit_usuario/${usuario.id_usuario}`} className="btn btn-warning btn-sm">
                                            Editar
                                        </Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => deletarUsuarios(usuario.id_usuario)}>
                                            Inativar
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

export default TabelaUsuarios;
