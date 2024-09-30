import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Geral from './components/views/Geral';
import Reservas from './components/views/Reserva';
import EditarReserva from './components/views/EditarReserva';
import Cadastros from './components/views/Hospedes';
import Relatorios from './components/views/Relatorios';
import Usuarios from './components/views/Usuarios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Geral />} />
        <Route path='/cadastros' element={<Cadastros />} />
        <Route path='/editreserva' element={<EditarReserva />} />
        <Route path='/reservas' element={<Reservas />} />

        <Route path='/relatorios' element={<Relatorios />} />

        <Route path='/usuarios' element={<Usuarios />} />

      
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
