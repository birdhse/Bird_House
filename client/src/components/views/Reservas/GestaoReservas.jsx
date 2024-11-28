import React, { useEffect, useState } from 'react'
import Menu from '../../layout/menu'
import TabelaReservas from '../tabelas/tabelaReservas';
import { Link, useParams } from 'react-router-dom'


function GestaoReservas() {
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
                setTextoMensagem('Reserva Cadastrada');
                break;
            case 'deletada':
                setClasseMensagem('alert alert-danger');
                setTextoMensagem('Reserva Deletada');
                break;
            case 'editada':
                setClasseMensagem('alert alert-primary');
                setTextoMensagem('Reserva Editada');
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
                    <h1 className='text-center mt-3'>Gestão de Reservas</h1>
                    {exibeAlerta && <div className={classeMensagem}>{textoMensagem}</div>}
                    

                    <div className='col=12 text-end my-2'>
                        <Link to='/cadastro_reserva' className='btn btn-primary ms-auto'>Cadastrar</Link>
                    </div>
                    <TabelaReservas tipo='edit' onDeleteSuccess={mensagemDelete} />
                </div>
            </div>
        </>
    )
}


export default GestaoReservas;