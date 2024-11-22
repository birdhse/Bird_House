import React from 'react'
import Menu from '../../layout/menu';

function MostrarHospedes() {
    function showTab(tabId) {
        const tabButtons = document.querySelectorAll('.tab');
        tabButtons.forEach(button => button.classList.remove('active'));

        const ButtonClicado = document.querySelector(`#${tabId}`);
        ButtonClicado.classList.add('active');

        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(tabContent => {
            tabContent.style.display = 'none';
        });

        const TabContentSelecionado = document.getElementById(tabId);
        TabContentSelecionado.style.display = 'block';
    }

    return (
        <div>
            <Menu />

            <div className="container mt-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Geral</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Hóspede</li>
                    </ol>
                </nav>

                <h2 className="mb-4">Amanda Xavier</h2>

                <div className="d-flex mb-3">
                    <button className="btn btn-info me-2 tab active" onClick={() => showTab('info')}>
                        Informações do hóspede
                    </button>
                    <button className="btn btn-outline-info tab" onClick={() => showTab('history')}>
                        Histórico de estadias
                    </button>
                </div>

                <div className="tab-content" id="info" style={{ display: 'block' }}>
                    <div className="d-flex align-items-center mb-4">
                        <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt="Foto de perfil" className="rounded-circle" style={{ width: '100px', height: '100px', marginRight: '20px' }} />
                        <button className="btn btn-outline-primary">Selecionar uma foto (Proporção: 500 x 500)</button>
                    </div>

                    <form className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="nome" className="form-label">Nome completo</label>
                            <input type="text" className="form-control" id="nome" value="Amanda Xavier" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input type="email" className="form-control" id="email" value="amanda@gmail.com" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="cpf" className="form-label">CPF</label>
                            <input type="text" className="form-control" id="cpf" value="000000000-00" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="nascimento" className="form-label">Nascimento</label>
                            <input type="date" className="form-control" id="nascimento" value="2003-03-30" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="contato" className="form-label">Contato</label>
                            <input type="text" className="form-control" id="contato" value="(00) 000000000" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="contato" className="form-label">Observações</label>
                            <input type="text" className="form-control" id="observacoes" value="Quartinho" />
                        </div>
                    </form>

                    {/* Botão de Editar na parte inferior, dentro da aba de informações */}
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-primary">Editar Hóspede</button>
                    </div>
                </div>

                <div className="tab-content" id="history" style={{ display: 'none' }}>
                    <p>Histórico de estadias não disponível.</p>
                </div>
            </div>
        </div>
    );
}

export default MostrarHospedes;
