import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Geral from './components/views/Geral';
import Reservas from './components/views/Reservas/GestaoReservas';
import EditarReserva from './components/views/Reservas/EditReserva';
import Cadastros from './components/views/Hospedes/GestaoHospedes';
import Relatorios from './components/views/Relatorios';
import CadastroReserva from './components/views/Reservas/CadastroReserva';
import EditReserva from './components/views/Reservas/EditReserva';
import GestaoReservas from './components/views/Reservas/GestaoReservas';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Geral />} />
        <Route path='/cadastros' element={<Cadastros />} />
        <Route path='/editreserva' element={<EditarReserva />} />
        <Route path='/reservas' element={<Reservas />} />
        <Route path='/relatorios' element={<Relatorios />} />
        <Route path='/cadastro_reserva' element={<CadastroReserva/>}/>
        <Route path='/reservas/:tipo' element={<GestaoReservas/>}/>
        <Route path='/edit_reserva/:id' element={<EditReserva/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
