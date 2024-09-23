import React from 'react';
import Menu from '../../layout/menu';

function Usuarios() {
    const handleUploadPhoto = () => {
        alert('Função para selecionar foto!');
    };

    const handleChangePassword = () => {
        alert('Função para alterar a senha!');
    };

    return (

        <div>
            <Menu />
            <div className="content">
                <div className="container">
                    <div className="breadcrumb">
                        <strong>Geral</strong> / Usuários
                    </div>

                    <h1>Amanda Xavier</h1>

                    <div className="user-photo-section">
                        <div className="user-photo">👤</div>
                        <button className="upload-button" onClick={handleUploadPhoto}>
                            Selecionar uma foto (Proporção: 500 x 500)
                        </button>
                    </div>

                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome Completo</label>
                            <input type="text" id="name" defaultValue="Amanda Xavier" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">E-mail/Login</label>
                            <input type="email" id="email" defaultValue="amanda@gmail.com" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Função</label>
                            <input type="text" id="role" placeholder="" />
                        </div>

                        <div className="form-group">
                            <input type="checkbox" id="active" defaultChecked />
                            <label htmlFor="active">Ativo</label>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="submit-button" onClick={handleChangePassword}>
                                Alterar senha
                            </button>
                            <a href="#" id="helpLink">Ajuda</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Usuarios;
