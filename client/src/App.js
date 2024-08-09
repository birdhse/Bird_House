import './css/Padrao.css';
import './css/Reserva.css';
import './css/Geral.css';
import './css/Relatorio.css';
import './css/Mapa.css';
import './css/Cadastro.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'
import Geral from './views/Geral';
import Reservas from './views/Reserva';
import EditarReserva from './views/EditarReserva';
import Cadastros from './views/Cadastro';
import express from "express"

const client = express()

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Geral />} />
        <Route path='/cadastros' element={<Cadastros />} />
        <Route path='/editreserva' element={<EditarReserva />} />
        <Route path='/reservas' element={<Reservas />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
