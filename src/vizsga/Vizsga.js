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
  const [started, setStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentUserScore, setCurrentUserScore] = useState(0);

  useEffect(() => {
    if (started) {
      fetchData();
      fetchUserScore();
    }
  }, [started]);

  async function fetchData() {
    setLoading(true);
    try {
      const magyarRes = await axios.get('http://localhost:5271/api/Szavak/GetAllHungarian');
      const spanyolRes = await axios.get('http://localhost:5271/api/Szavak/GetAllSpanish');
      const mondatokMagyarRes = await axios.get('http://localhost:5271/api/Mondatok/GetAllHungarian');
      const mondatokSpanyolRes = await axios.get('http://localhost:5271/api/Mondatok/GetAllSpanish');
  
      const combinedData = [
        ...magyarRes.data.map((item, index) => ({
          magyar: item.magyarSzo,
          spanyol: spanyolRes.data[index].spanyolSzo,
        })),
        ...mondatokMagyarRes.data.map((item, index) => ({
          magyar: item.magyarMondatok,
          spanyol: mondatokSpanyolRes.data[index].spanyolMondatok,
        })),
      ];
  
      setData(combinedData);
    } catch (error) {
      console.error('Hiba az adatok betöltésekor:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserScore() {
    try {
      const response = await axios.get(`http://localhost:5271/api/User/GetScore?uId=${localStorage.getItem("token")}&Nev=${localStorage.getItem("name")}`);
      setCurrentUserScore(response.data);
    } catch (error) {
      console.error('Error fetching score:', error);
    }
  }

  async function updateUserScore() {
    if (score > currentUserScore) {
      try {
        await axios.put(`http://localhost:5271/api/User/updateScore/${localStorage.getItem("token")}`, {
          pontszam: score,
          nev: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
          salt: "string",
          hash: "string",
          jogosultsag: 0,
          aktiv: 1,
          jogosultsagNavigation: null
        });
        console.log('Pontszám sikeresen frissítve');
      } catch (error) {
        console.error('Hiba a pontszám frissítésekor:', error);
      }
    }
  }

  function handleSubmit() {
    if (data[currentIndex] && data[currentIndex].spanyol) {
      if (answer.trim().toLowerCase() === data[currentIndex].spanyol.toLowerCase()) {
        setScore(score + 1);
      }
    }
    
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = answer.trim();
    setUserAnswers(updatedAnswers);

    setAnswer('');
    
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAnswer(userAnswers[currentIndex - 1] || '');
    }
  }

  function handleNext() {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswer(userAnswers[currentIndex + 1] || '');
    }
  }

  useEffect(() => {
    if (finished) {
      updateUserScore();
    }
  }, [finished]);

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
          <button type="submit" className="submit-btn" onClick={() => { 
            setStarted(false); 
            setCurrentIndex(0); 
            setScore(0); 
            setFinished(false); 
            setUserAnswers([]);
          }}>
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
            onClick={function() {
              handleSubmit();
              handleNext();
            }}
            disabled={finished} 
          >
            Mentés
          </button>
          <div className="navigation-buttons">
            <button 
              type="button" className="submit-btn"
              onClick={handlePrevious} 
              disabled={currentIndex === 0}
            >
              Előző
            </button>
            <button 
              type="button" className="submit-btn"
              onClick={handleNext}
              disabled={currentIndex === data.length - 1}
            >
              Következő
            </button>
          </div>
          <p>{currentIndex + 1} / {data.length}</p>
        </div>
      )}
    </div>
  );
}