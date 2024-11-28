import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import TelaLogin from './components/views/TelaLogin/TelaLogin';
import Geral from './components/views/Geral/Geral'

import ListarReservas from './components/views/Reservas/GestaoReservas';
import CadastroReserva from './components/views/Reservas/CadastroReserva'
import EditReserva from './components/views/Reservas/EditarReserva';

import Relatorios from './components/views/Relatorios/Relatorios';

import ListarHospedes from './components/views/Hospedes/GestaoHospedes';

import ConfigUsuario from './components/views/ConfigUsuario/ConfigUsuario';
import FormHospede from './components/forms/FormHospede';
import CadastroHospede from './components/views/Hospedes/CadastroHospede';
import EditHospede from './components/views/Hospedes/EditHospede';
import FormReserva from './components/forms/FormReserva';
// import TelaLogin from './components/views/TelaLogin/TelaLogin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<TelaLogin />} /> */}
        <Route path='/' element={<TelaLogin />} />
        <Route path='/geral' element={<Geral />} />
        <Route path='/relatorios' element={<Relatorios />} />

        <Route path='/reservas' element={<ListarReservas />} />
        <Route path='/reservas/:tipo' element={<ListarReservas/>}/>
        <Route path='/reserva/:id_reserva' element={<FormReserva/>}/>
        <Route path='/cadastro_reserva' element={<CadastroReserva/>}/>
        <Route path='/edit_reserva/:id_reserva' element={<EditReserva/>}/>

        <Route path='/hospedes' element={<ListarHospedes/>}/>
        <Route path='/hospedes/:tipo' element={<ListarHospedes/>}/>
        <Route path='/hospede/:id_hospede' element={<FormHospede/>}/>
        <Route path='/cadastro_hospede' element={<CadastroHospede/>}/>
        <Route path='/edit_hospede/:id_hospede' element={<EditHospede/>}/>

        <Route path='/usuarios' element={<ConfigUsuario />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;