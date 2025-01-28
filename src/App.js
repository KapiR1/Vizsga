import './App.css';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';
import Profil from './Profil';
import ListSzavakMondatok from './ListSzavakMondatok';
import Vizsga from './Vizsga';
import Register from './Register';
import Login from './Login';

export default function App() {
  return (
    <div> 
      <Navbar/>
      <Routes>
        <Route path='/' element={<Profil/>}/>
        <Route path='/szavakmondatok' element={<ListSzavakMondatok/>}/>
        <Route path='/vizsga' element={<Vizsga/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}