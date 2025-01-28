import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default function ListSzavakMondatok() {
    const [szavakmondatok, setSzavakmondatok] = useState([]);
  
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
      Get()
    }, [])
    
    function Get(){
      setPending(true);
      axios.get("http://localhost:5000/", {
      }).then((data) => setSzavakmondatok(data.data)).catch((error) => {console.error('Hiba:', error)}).finally(() => {setPending(false)})
    }
  
    return (
      <div>
        {error ? (<h1>Hiba</h1>) : isPending ? (
          <ClipLoader loading={isPending} color='orange' size={150}/>
        ) : (
          szavakmondatok.map(data => (<Card data={data} Get={Get}/>))
        )}
      </div>
    )
}