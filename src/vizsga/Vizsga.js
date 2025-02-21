import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
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
    <div className="card2">
      <Navbar />
      {!started ? (
        <div>
          <h2>Kezdd el a vizsgát</h2>
          <button type="submit" className="submit-btn" onClick={() => setStarted(true)} >Indítás</button>
        </div>
      ) : loading ? (
        <p>Betöltés...</p>
      ) : finished ? (
        <div className="header">
          <h2>Vizsga vége!</h2>
          <p>Eredményed: {score} / {data.length}</p>
          <button type="submit" className="submit-btn" onClick={() => { setStarted(false); setCurrentIndex(0); setScore(0); setFinished(false); }}>
            Újrakezdés
          </button>
        </div>
      ) : (
        <div>
          <h2 className="header">{data[currentIndex]?.magyar}</h2><br/>
          <input className="iras"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="A spanyol megfelelőjét írd be"
          />
          <button type="submit" className="submit-btn"
            onClick={handleSubmit}
            disabled={finished}  // Disable the button when finished
          >
            Küldés
          </button>
        </div>
      )}
    </div>
  );
}  