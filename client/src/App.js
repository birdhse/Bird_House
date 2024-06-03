import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'
import Geral from './views/Geral';
import Reserva from './views/Reserva';
import EditarReserva from './views/EditarReserva';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Geral />} />
        <Route path='/editreserva' element={<EditarReserva />} />
        <Route path='/reserva' element={<Reserva />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
