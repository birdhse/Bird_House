import React, { useEffect, useState } from 'react'
import Menu from '../../layout/menu'
import TabelaUsuarios from '../tabelas/tabelaUsuarios';
import { Link, useParams } from 'react-router-dom'


function GestaoUsuarios() {
    const { tipo } = useParams();
    const [exibeAlerta, setExibeAlerta] = useState(false);
    const [tipoMensagem, setTipoMensagem] = useState(tipo);
    const [classeMensagem, setClasseMensagem] = useState('');
    const [textoMensagem, setTextoMensagem] = useState('');

    useEffect(() => {
        if (tipoMensagem) {
            setExibeAlerta(true);
            atualizaMensagem();
            setTimeout(() => {
                setExibeAlerta(false);
                setTipoMensagem('');
            }, 5000);
        }
    }, [tipoMensagem]);

    function mensagemDelete() {
        setTipoMensagem('deletada');

    }

    function atualizaMensagem() {
        switch (tipoMensagem) {
            case 'cadastrada':
                setClasseMensagem('alert alert-success');
                setTextoMensagem('Usuário Cadastrado');
                break;
            case 'deletada':
                setClasseMensagem('alert alert-danger');
                setTextoMensagem('Usuário Deletado');
                break;
            case 'editada':
                setClasseMensagem('alert alert-primary');
                setTextoMensagem('Usuário Editado');
                break;
            case 'erro':
                setClasseMensagem('alert alert-warning');
                setTextoMensagem('Erro na operação');
                break;
        }
    }


    return (
        <>
            <Menu />
            <div>
                <div className='container'>
                    <h1 className='text-center mt-3'>Gestão de Usuários</h1>
                    {exibeAlerta && <div className={classeMensagem}>{textoMensagem}</div>}
                    

                    <div className='col=12 text-end my-2'>
                        <Link to='/cadastro_usuario' className='btn btn-primary ms-auto'>Cadastrar</Link>
                    </div>
                    <TabelaUsuarios tipo='edit' onDeleteSuccess={mensagemDelete} />
                </div>
            </div>
        </>
    )
}


export default GestaoUsuarios;