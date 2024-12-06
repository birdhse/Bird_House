import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import TelaLogin from './components/views/TelaLogin/TelaLogin';
import Geral from './components/views/Geral/Geral'

import GestãoReservas from './components/views/Reservas/GestaoReservas';
import CadastroReserva from './components/views/Reservas/CadastroReserva'
import EditReserva from './components/views/Reservas/EditarReserva';
import FormReserva from './components/views/Reservas/FormReserva';

import Relatorios from './components/views/Relatorios/Relatorios';
import GestãoHospedes from './components/views/Hospedes/GestaoHospedes';

import FormHospede from './components/views/Hospedes/FormHospede';
import CadastroHospede from './components/views/Hospedes/CadastroHospede';
import EditHospede from './components/views/Hospedes/EditHospede';


import GestaoUsuarios from './components/views/Usuario/GestãoUsuario';
import CadastroUsuario from './components/views/Usuario/CadastroUsuario'
import EditUsuario from './components/views/Usuario/EditarUsuario';
import FormUsuario from './components/views/Usuario/FormUsuario';
import EsqueciSenha from './components/views/TelaLogin/ForgotPassword';

// import TelaLogin from './components/views/TelaLogin/TelaLogin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TelaLogin />} />
        <Route path='/esqueci_senha' element={<EsqueciSenha/>} />
        <Route path='/geral' element={<Geral />} />
        <Route path='/relatorios' element={<Relatorios />} />

        <Route path='/reservas' element={<GestãoReservas />} />
        <Route path='/reservas/:tipo' element={<GestãoReservas/>}/>
        <Route path='/reserva/:id_reserva' element={<FormReserva/>}/>
        <Route path='/cadastro_reserva' element={<CadastroReserva/>}/>
        <Route path='/edit_reserva/:id_reserva' element={<EditReserva/>}/>

        <Route path='/hospedes' element={<GestãoHospedes/>}/>
        <Route path='/hospedes/:tipo' element={<GestãoHospedes/>}/>
        <Route path='/hospede/:id_hospede' element={<FormHospede/>}/>
        <Route path='/cadastro_hospede' element={<CadastroHospede/>}/>
        <Route path='/edit_hospede/:id_hospede' element={<EditHospede/>}/>

        <Route path='/config_usuarios/:id_usuario' element={<EditUmUsuario />} />
        {/* <Route path='/config_usuarios/:id_usuario' element={<ConfigUsuario />} /> */}

        <Route path='/usuarios' element={<GestaoUsuarios/>}/>
        <Route path='/usuarios/:tipo' element={<GestaoUsuarios/>}/>
        <Route path='/usuario/:id_usuario' element={<FormUsuario/>}/>
        <Route path='/cadastro_usuario' element={<CadastroUsuario/>}/>
        <Route path='/edit_usuario/:id_usuario' element={<EditUsuario/>}/>
        
        



      </Routes>
    </BrowserRouter>
  );
}

export default App;