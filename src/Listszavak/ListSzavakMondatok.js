import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ListSzavakCard from './ListszavakCard';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Navbar from '../Navbar';
import '../Listszavak/Listszavak.css';

export default function ListSzavakMondatok() {
    const [szavakmagyar, setszavakmagyar] = useState([]);
    const [szavakspanyol, setszavakspanyol] = useState([]);
  
    const [isPendingmagyarszavak, setPendingmagyarszavak] = useState(false);
    const [errormagyarszavak, setErrormagyarszavak] = useState(false);

    const [isPendingspanyolszavak, setPendingspanyolszavak] = useState(false);
    const [errorspanyolszavak, setErrorspanyolszavak] = useState(false);

    useEffect(() => {
      Get()
    }, [])
    
    function Get(){
      setPendingmagyarszavak(true);
      axios.get("http://localhost:5271/api/Szavak/GetAllHungarian", {
      }).then((data) => setszavakmagyar(data.data)).catch((error) => {console.error('Hiba:', error);setErrormagyarszavak(true)}).finally(() => {setPendingmagyarszavak(false)})
      setPendingspanyolszavak(true);
      axios.get("http://localhost:5271/api/Szavak/GetAllSpanish", {
      }).then((data) => setszavakspanyol(data.data)).catch((error) => {console.error('Hiba:', error);setErrorspanyolszavak(true)}).finally(() => {setPendingspanyolszavak(false)})
    }
  
    return (

      <div> 
        <Navbar/>
        <div className="kartyakontener">
        <h2>Magyar-Spanyol szavak és mondatok</h2>
        <br/>
          <div className="karyak">
        {errormagyarszavak || errorspanyolszavak ? (<h1>Hiba</h1>) : isPendingspanyolszavak || isPendingmagyarszavak ? (
          <ClipLoader loading={isPendingmagyarszavak} color='orange' size={150}/>
        ) : (
          szavakmagyar.map((szavak, index) => (<ListSzavakCard key={index} magyar_szo={szavak.magyarSzo} spanyol_szo={szavakspanyol[index].spanyolSzo} Get={Get}/>))
        )}
        </div>
        <br/>
        <button className='gomb'>mondatok</button>
        </div>
      
      
      </div>
    )
}
