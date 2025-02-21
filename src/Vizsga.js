import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Progress from './Progress';
import "./Vizsga.css";

export default function Vizsga() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);  // New state to track if the test has started

  useEffect(() => {
    if (started) {
      fetchData();
    }
  }, [started]);

  async function fetchData() {
    setLoading(true);
    try {
      const magyarRes = await axios.get('http://localhost:5271/api/Szavak/GetAllHungarian');
      const spanyolRes = await axios.get('http://localhost:5271/api/Szavak/GetAllSpanish');
      const mondatokMagyarRes = await axios.get('http://localhost:5271/api/Mondatok/GetAllHungarian');
      const mondatokSpanyolRes = await axios.get('http://localhost:5271/api/Mondatok/GetAllSpanish');
  
      console.log('Hungarian Sentences:', mondatokMagyarRes.data);
      console.log('Spanish Sentences:', mondatokSpanyolRes.data);
  
      const combinedData = [
        ...magyarRes.data.map((item, index) => ({
          magyar: item.magyarSzo,
          spanyol: spanyolRes.data[index].spanyolSzo,
        })),
        ...mondatokMagyarRes.data.map((item, index) => ({
          magyar: item.magyarMondat,
          spanyol: mondatokSpanyolRes.data[index].spanyolMondat,
        })),
      ];
  
      setData(combinedData);
    } catch (error) {
      console.error('Hiba az adatok betöltésekor:', error);
    } finally {
      setLoading(false);
    }
  }  

  function handleSubmit() {
    if (data[currentIndex] && data[currentIndex].spanyol) { // Ensure data[currentIndex] exists and has the 'spanyol' property
      if (answer.trim().toLowerCase() === data[currentIndex].spanyol.toLowerCase()) {
        setScore(score + 1);
      }
    }
    
    setAnswer('');
    
    // Ensure we don't increment past the last index
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  }  

  return (
    <div className="card2 flex flex-col items-center justify-center h-screen bg-cover bg-center">
      <Navbar />
      {!started ? (
        <div className="text-center card2 header">
          <h2 className="text-2xl font-bold">Kezdd el a vizsgát</h2>
          <button onClick={() => setStarted(true)} className="card2 header bg-black text-white px-4 py-2 rounded mt-4 w-full">Indítás</button>
        </div>
      ) : loading ? (
        <p>Betöltés...</p>
      ) : finished ? (
        <div className="card2 header">
          <h2 className="text-2xl font-bold">Vizsga vége!</h2>
          <p className="text-lg">Eredményed: {score} / {data.length}</p>
          <button onClick={() => { setStarted(false); setCurrentIndex(0); setScore(0); setFinished(false); }} className="card2 header bg-black text-white px-4 py-2 rounded mt-4 w-full">
            Újrakezdés
          </button>
        </div>
      ) : (
        <div className="card2 header">
          <Progress value={(currentIndex / data.length) * 100} className="w-full mb-4" />
          <h2 className="header">{data[currentIndex]?.magyar}</h2><br/>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded w-full text-center bg-gray-100 focus:outline-none"
            placeholder="A spanyol megfelelőjét írd be"
          />
          <button
            onClick={handleSubmit}
            className="card2 header bg-black text-white px-4 py-2 rounded mt-4 w-full"
            disabled={finished}  // Disable the button when finished
          >
            Küldés
          </button>
        </div>
      )}
    </div>
  );
}  