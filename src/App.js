import './App.css';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';
import Profil from './Profil';
import ListSzavakMondatok from './ListSzavakMondatok';
import Vizsga from './Vizsga'; 
import Register from './Register';
import Startup from './Startup';

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Startup/>}/>
        <Route path='/profil' element={<Profil/>}/>
        <Route path='/szavakmondatok' element={<ListSzavakMondatok/>}/>
        <Route path='/vizsga' element={<Vizsga/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  )
}