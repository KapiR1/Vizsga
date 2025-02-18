import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Progress from './Progress';
import "./Vizsga.css";


export default function Vizsga() {
  const [mode, setMode] = useState(null);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (mode) {
      fetchData();
    }
  }, [mode]);

  async function fetchData() {
    setLoading(true);
    try {
      const magyarRes = await axios.get(`https://localhost:5271/api/${mode === 'szavak' ? 'Szavak' : 'Mondatok'}/GetAllHungarian`);
      const spanyolRes = await axios.get(`https://localhost:5271/api/${mode === 'szavak' ? 'Szavak' : 'Mondatok'}/GetAllSpanish`);
      
      const combinedData = magyarRes.data.map((item, index) => ({
        magyar: item.magyarSzo || item.magyarMondat,
        spanyol: spanyolRes.data[index].spanyolSzo || spanyolRes.data[index].spanyolMondat,
      }));
      
      setData(combinedData);
    } catch (error) {
      console.error('Hiba az adatok betöltésekor:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit() {
    if (answer.trim().toLowerCase() === data[currentIndex].spanyol.toLowerCase()) {
      setScore(score + 1);
    }
    setAnswer('');
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  }

  return (
    <div className="card2 flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-background.jpg')" }}>
      <Navbar />
      {!mode ? (
        <div className="text-center card2 header">
          <h2 className="text-2xl font-bold">Válassz vizsgát</h2>
          <button onClick={() => setMode('szavak')} className="card2 header bg-black text-white px-4 py-2 rounded mt-4 w-full">Szavak</button>
          <button onClick={() => setMode('mondatok')} className="card2 header bg-black text-white px-4 py-2 rounded mt-4 w-full">Mondatok</button>
        </div>
      ) : loading ? (
        <p>Betöltés...</p>
      ) : finished ? (
        <div className="card2 header">
          <h2 className="text-2xl font-bold">Vizsga vége!</h2>
          <p className="text-lg">Eredményed: {score} / {data.length}</p>
          <button onClick={() => { setMode(null); setCurrentIndex(0); setScore(0); setFinished(false); }} className="card2 header bg-black text-white px-4 py-2 rounded mt-4 w-full">Újrakezdés</button>
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
          <button onClick={handleSubmit} className="card2 header bg-black text-white px-4 py-2 rounded mt-4 w-full">Küldés</button>
        </div>
      )}
    </div>
  );
}
