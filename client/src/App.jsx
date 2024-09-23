import './css/Padrao.css';
import './css/Reserva.css';
import './css/Geral.css';
import './css/Relatorio.css';
import './css/Mapa.css';
import './css/Cadastro.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Geral from './components/views/Geral';
import Reservas from './components/views/Reserva';
import EditarReserva from './components/views/EditarReserva';
import Cadastros from './components/views/Hospedes';
import Relatorios from './components/views/Relatorios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Geral />} />
        <Route path='/cadastros' element={<Cadastros />} />
        <Route path='/editreserva' element={<EditarReserva />} />
        <Route path='/reservas' element={<Reservas />} />
        <Route path='/relatorios' element={<Relatorios/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
