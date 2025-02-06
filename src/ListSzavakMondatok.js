import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Navbar from './Navbar';
import './ListSzavakMondatok.css';

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
      axios.get("https://localhost:7156/api/Szavak/GetAllHungarian", {
      }).then((data) => setszavakmagyar(data.data)).catch((error) => {console.error('Hiba:', error);setErrormagyarszavak(true)}).finally(() => {setPendingmagyarszavak(false)})
      setPendingspanyolszavak(true);
      axios.get("https://localhost:7156/api/Szavak/GetAllSpanish", {
      }).then((data) => setszavakspanyol(data.data)).catch((error) => {console.error('Hiba:', error);setErrorspanyolszavak(true)}).finally(() => {setPendingspanyolszavak(false)})
    }
  
    return (

      <div className='row'> 
        <Navbar/>
        <h2>Magyar-Spanyol szavak</h2> 
        {errormagyarszavak || errorspanyolszavak ? (<h1>Hiba</h1>) : isPendingspanyolszavak || isPendingmagyarszavak ? (
          <ClipLoader loading={isPendingmagyarszavak} color='orange' size={150}/>
        ) : (
          szavakmagyar.map((szavak, index) => (<Card key={index} magyar_szo={szavak.magyarSzo} spanyol_szo={szavakspanyol[index].spanyolSzo} Get={Get}/>))
        )}
      
      
      </div>
    )
}
