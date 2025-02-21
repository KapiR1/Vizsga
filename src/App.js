import './App.css';
import { Routes, Route } from 'react-router-dom';
import Profil from './Profil';
import ListSzavakMondatok from './Listszavak/ListSzavakMondatok';
import Vizsga from './vizsga/Vizsga'; 
import Register from './Register';
import Startup from './Startup';
import Fooldal from './Fooldal/Fooldal';

export default function App() {
  return (
    <div className='App'>
      <Routes>
      <Route path='/' element={<Fooldal/>}/>
        <Route path='/startup' element={<Startup/>}/>
        <Route path='/profil' element={<Profil/>}/>
        <Route path='/szavakmondatok' element={<ListSzavakMondatok/>}/>
        <Route path='/vizsga' element={<Vizsga/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  )
}