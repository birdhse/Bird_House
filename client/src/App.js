import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'
import EditarReserva from './views/EditarReserva';
import Geral from './views/Geral';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Geral />} />
        <Route path='/editarreserva' element={<EditarReserva />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
