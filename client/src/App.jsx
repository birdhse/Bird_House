import './css/Padrao.css';
import './css/Reserva.css';
import './css/Geral.css';
import './css/Relatorio.css';
import './css/Mapa.css';
import './css/Cadastro.css';
import './css/Usuarios.css';

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
<<<<<<< HEAD
        <Route path='/relatorios' element={<Relatorios />} />
=======
<<<<<<< HEAD
        <Route path='/usuarios' element={<Usuarios />} />

=======
        <Route path='/relatorios' element={<Relatorios/>}/>
>>>>>>> f57a7c58b5cbaa6e114eb7b7754e9451b0fdddb4
        
>>>>>>> bded1f5fc62b987b73463b42ce1eac427a4a6017
      </Routes>
    </BrowserRouter>
  );
}

export default App;
