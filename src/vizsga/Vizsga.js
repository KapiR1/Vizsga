"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../Navbar"
import "./Vizsga.css"

export default function Vizsga() {
  const [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [started, setStarted] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])
  const [currentUserScore, setCurrentUserScore] = useState(0)

  useEffect(() => {
    if (started) {
      fetchData()
      fetchUserScore()
    }
  }, [started])

  async function fetchData() {
    setLoading(true)
    try {
      const magyarRes = await axios.get("http://localhost:5271/api/Szavak/GetAllHungarian")
      const spanyolRes = await axios.get("http://localhost:5271/api/Szavak/GetAllSpanish")
      const mondatokMagyarRes = await axios.get("http://localhost:5271/api/Mondatok/GetAllHungarian")
      const mondatokSpanyolRes = await axios.get("http://localhost:5271/api/Mondatok/GetAllSpanish")

      const combinedData = [
        ...magyarRes.data.map((item, index) => ({
          magyar: item.magyarSzo,
          spanyol: spanyolRes.data[index].spanyolSzo,
        })),
        ...mondatokMagyarRes.data.map((item, index) => ({
          magyar: item.magyarMondatok,
          spanyol: mondatokSpanyolRes.data[index].spanyolMondatok,
        })),
      ]

      setData(combinedData)
    } catch (error) {
      console.error("Hiba az adatok betöltésekor:", error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchUserScore() {
    try {
      const response = await axios.get(
        `http://localhost:5271/api/User/GetScore?uId=${localStorage.getItem("token")}&Nev=${localStorage.getItem("name")}`,
      )
      setCurrentUserScore(response.data)
    } catch (error) {
      console.error("Error fetching score:", error)
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
          jogosultsagNavigation: null,
        })
        console.log("Pontszám sikeresen frissítve")
      } catch (error) {
        console.error("Hiba a pontszám frissítésekor:", error)
      }
    }
  }

  function handleSubmit() {
    if (data[currentIndex] && data[currentIndex].spanyol) {
      if (answer.trim().toLowerCase() === data[currentIndex].spanyol.toLowerCase()) {
        setScore(score + 1)
      }
    }

    const updatedAnswers = [...userAnswers]
    updatedAnswers[currentIndex] = answer.trim()
    setUserAnswers(updatedAnswers)

    setAnswer("")

    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setFinished(true)
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setAnswer(userAnswers[currentIndex - 1] || "")
    }
  }

  function handleNext() {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setAnswer(userAnswers[currentIndex + 1] || "")
    }
  }

  function insertCharacter(char) {
    // Insert the character at the current cursor position or at the end
    const inputElement = document.querySelector(".iras")
    if (inputElement) {
      const start = inputElement.selectionStart
      const end = inputElement.selectionEnd
      const newValue = answer.substring(0, start) + char + answer.substring(end)
      setAnswer(newValue)

      // Set cursor position after the inserted character
      setTimeout(() => {
        inputElement.focus()
        inputElement.setSelectionRange(start + 1, start + 1)
      }, 0)
    } else {
      // If we can't get the selection, just append to the end
      setAnswer(answer + char)
    }
  }

  useEffect(() => {
    if (finished) {
      updateUserScore()
    }
  }, [finished])

  return (
    <div className="vizsga-wrapper">
      <Navbar />
      <div className="card2">
        {!started ? (
          <div className="vizsga-intro">
            <div className="vizsga-header">
              <h2>VIZSGARÉSZ</h2>
              <div className="header-decoration"></div>
            </div>

            <div className="vizsga-description">
              <p>
                A vizsgában meglesznek adva a magyar szavak/mondatok, neked pedig a spanyol megfelelőjét kellesz
                megadnod. A vizsga kezdésével nem lesz lehetőséged visszalépni, szóval csak óvatosan.
              </p>
            </div>

            <div className="vizsga-info">
              <div className="info-item">
                <div className="info-icon">📝</div>
                <div className="info-text">Add meg a szavak spanyol megfelelőjét</div>
              </div>
              <div className="info-item">
                <div className="info-icon">🔄</div>
                <div className="info-text">Nincs időkorlát</div>
              </div>
              <div className="info-item">
                <div className="info-icon">🏆</div>
                <div className="info-text">Gyűjts pontokat a helyes válaszokért</div>
              </div>
            </div>

            <h4 className="success-message">Sok sikert!</h4>

            <button type="submit" className="submit-btn start-btn" onClick={() => setStarted(true)}>
              Indítás
            </button>
          </div>
        ) : loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Betöltés...</p>
            <p className="loading-message">Kérdések előkészítése</p>
          </div>
        ) : finished ? (
          <div className="vizsga-result">
            <div className="result-header">
              <h2>Vizsga vége!</h2>
              <div className="header-decoration"></div>
            </div>

            <div className="result-score">
              <div className="score-circle">
                <div className="score-number">{score}</div>
                <div className="score-total">/ {data.length}</div>
              </div>
              <div className="score-text">
                {score === data.length
                  ? "Tökéletes!"
                  : score >= data.length * 0.8
                    ? "Nagyon jó!"
                    : score >= data.length * 0.6
                      ? "Jó munka!"
                      : score >= data.length * 0.4
                        ? "Nem rossz!"
                        : "Próbáld újra!"}
              </div>
            </div>

            <div className="result-message">
              <p>{score > currentUserScore ? "Új rekord! Gratulálunk!" : "Folyamatosan fejlődsz!"}</p>
            </div>

            <button
              type="submit"
              className="submit-btn"
              onClick={() => {
                setStarted(false)
                setCurrentIndex(0)
                setScore(0)
                setFinished(false)
                setUserAnswers([])
              }}
            >
              Újrakezdés
            </button>
          </div>
        ) : (
          <div className="vizsga-question">
            <div className="question-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(currentIndex / (data.length - 1)) * 100}%` }}></div>
              </div>
              <div className="progress-text">
                {currentIndex + 1} / {data.length}
              </div>
            </div>

            <div className="question-content">
              <h2 className="question-text">{data[currentIndex]?.magyar}</h2>

              <div className="answer-container">
                <input
                  className="iras"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="A spanyol megfelelőjét írd be"
                />

                <div className="spanish-char-buttons">
                  <button type="button" className="char-btn" onClick={() => insertCharacter("¿")}>
                    ¿
                  </button>
                  <button type="button" className="char-btn" onClick={() => insertCharacter("¡")}>
                    ¡
                  </button>
                  <button type="button" className="char-btn" onClick={() => insertCharacter("ñ")}>
                    ñ
                  </button>
                  <button type="button" className="char-btn" onClick={() => insertCharacter("Ñ")}>
                    Ñ
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                onClick={() => {
                  handleSubmit()
                  handleNext()
                }}
                disabled={finished}
              >
                Mentés
              </button>

              <div className="navigation-buttons">
                <button
                  type="button"
                  className="submit-btn nav-btn"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  Előző
                </button>
                <button
                  type="button"
                  className="submit-btn nav-btn"
                  onClick={handleNext}
                  disabled={currentIndex === data.length - 1}
                >
                  Következő
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

