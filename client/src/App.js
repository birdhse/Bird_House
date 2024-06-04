import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'
import Geral from './views/Geral';
import Reserva from './views/Reserva';
import EditarReserva from './views/EditarReserva';
import Cadastro from './views/Cadastro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Geral />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/editreserva' element={<EditarReserva />} />
        <Route path='/reserva' element={<Reserva />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
