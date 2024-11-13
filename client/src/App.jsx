import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Geral from './components/views/Geral/Geral'
import ListarReservas from './components/views/Reservas/GestaoReservas';
import CadastroReserva from './components/views/Reservas/CadastroReserva'
import EditReserva from './components/views/Reservas/EditReserva';
import Relatorios from './components/views/Relatorios/Relatorios';
import ListarHospedes from './components/views/Hospedes/GestaoHospedes';
import ConfigUsuario from './components/views/ConfigUsuario/ConfigUsuario';
import TelaLogin from './components/views/TelaLogin/TelaLogin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<TelaLogin />} />
        <Route path='/geral' element={<Geral />} />
        <Route path='/relatorios' element={<Relatorios />} />
        <Route path='/reservas' element={<ListarReservas />} />
        <Route path='/reservas/:tipo' element={<ListarReservas/>}/>
        <Route path='/cadastro_reserva' element={<CadastroReserva/>}/>
        <Route path='/edit_reserva/:id' element={<EditReserva/>}/>


        <Route path='/hospedes' element={<ListarHospedes/>}/>
        <Route path='/hospedes/:tipo' element={<ListarHospedes/>}/>


        <Route path='/usuarios' element={<ConfigUsuario/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
