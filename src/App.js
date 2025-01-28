import './App.css';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';
import Profil from './Profil';
import ListSzavakMondatok from './ListSzavakMondatok';
import Vizsga from './Vizsga';

export default function App() {
  return (
    <div> 
      <Navbar/>
      <Routes>
        <Route path='/' element={<Profil/>}/>
        <Route path='/szavakmondatok' element={<ListSzavakMondatok/>}/>
        <Route path='/vizsga' element={<Vizsga/>}/>
      </Routes>
    </div>
  )
}