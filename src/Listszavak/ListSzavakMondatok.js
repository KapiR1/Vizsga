import React, { useEffect, useState } from 'react';
import ListSzavakCard from './ListszavakCard';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Navbar from '../Navbar';
import '../Listszavak/Listszavak.css';
import ListMondatokCard from './ListmondatokCard';

export default function ListSzavakMondatok() {
  // SZAVAK
  const [szavakmagyar, setszavakmagyar] = useState([]);
  const [szavakspanyol, setszavakspanyol] = useState([]);

  const [isPendingmagyarszavak, setPendingmagyarszavak] = useState(false);
  const [errormagyarszavak, setErrormagyarszavak] = useState(false);

  const [isPendingspanyolszavak, setPendingspanyolszavak] = useState(false);
  const [errorspanyolszavak, setErrorspanyolszavak] = useState(false);

  // MONDATOK
  const [mondatokmagyar, setmondatokmagyar] = useState([]);
  const [mondatokspanyol, setmondatokspanyol] = useState([]);

  const [isPendingmagyarmondatok, setPendingmagyarmondatok] = useState(false);
  const [errormagyarmondatok, setErrormagyarmondatok] = useState(false);

  const [isPendingspanyolmondatok, setPendingspanyolmondatok] = useState(false);
  const [errorspanyolmondatok, setErrorspanyolmondatok] = useState(false);

  // Váltás Szavak és Mondatok között
  const [isWordsView, setIsWordsView] = useState(true);

  useEffect(() => {
    Get();
  }, []);

  function Get() {
    setPendingmagyarszavak(true);
    axios
      .get('http://localhost:5271/api/Szavak/GetAllHungarian')
      .then((data) => setszavakmagyar(data.data))
      .catch((error) => {
        console.error('Hiba:', error);
        setErrormagyarszavak(true);
      })
      .finally(() => {
        setPendingmagyarszavak(false);
      });

    setPendingspanyolszavak(true);
    axios
      .get('http://localhost:5271/api/Szavak/GetAllSpanish')
      .then((data) => setszavakspanyol(data.data))
      .catch((error) => {
        console.error('Hiba:', error);
        setErrorspanyolszavak(true);
      })
      .finally(() => {
        setPendingspanyolszavak(false);
      });

    // Fetch sentences if needed
    setPendingmagyarmondatok(true);
    axios
      .get('http://localhost:5271/api/Mondatok/GetAllHungarian')
      .then((data) => setmondatokmagyar(data.data))
      .catch((error) => {
        console.error('Hiba:', error);
        setErrormagyarmondatok(true);
      })
      .finally(() => {
        setPendingmagyarmondatok(false);
      });

    setPendingspanyolmondatok(true);
    axios
      .get('http://localhost:5271/api/Mondatok/GetAllSpanish')
      .then((data) => setmondatokspanyol(data.data))
      .catch((error) => {
        console.error('Hiba:', error);
        setErrorspanyolmondatok(true);
      })
      .finally(() => {
        setPendingspanyolmondatok(false);
      });
  }

  return (
    <div>
      <Navbar />
      <div className="kartyakontener">
        <h2>Magyar-Spanyol szavak és mondatok</h2>
        <br />
        <div className="karyak">
          {errormagyarszavak || errorspanyolszavak || errormagyarmondatok || errorspanyolmondatok ? (
            <h1>Hiba</h1>
          ) : isPendingspanyolszavak || isPendingmagyarszavak || isPendingspanyolmondatok || isPendingmagyarmondatok ? (
            <ClipLoader loading={isPendingmagyarszavak} color="orange" size={150} />
          ) : (
            <>
              {isWordsView
                ? szavakmagyar.map((szavak, index) => (
                    <ListSzavakCard
                      key={index}
                      magyar_szo={szavak.magyarSzo}
                      spanyol_szo={szavakspanyol[index].spanyolSzo}
                      Get={Get}
                    />
                  ))
                : mondatokmagyar.map((mondatok, index) => (
                    <ListMondatokCard
                      key={index}
                      magyar_mondat={mondatok.magyarMondatok}
                      spanyol_mondat={mondatokspanyol[index].spanyolMondatok}
                      Get={Get}
                    />
                  ))}
            </>
          )}
        </div>
        <br />
        <button type="submit" className="submit-btn"
          onClick={() => setIsWordsView(!isWordsView)}
        >
          {isWordsView ? 'Váltás mondatokra' : 'Váltás szavakra'}
        </button>
      </div>
    </div>
  );
}