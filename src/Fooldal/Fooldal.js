import { Link } from "react-router-dom";
import '../Fooldal/Fooldal.css';
import LogoTongue from "../img/LogoTongue.png";

export default function Fooldal() {
    return (
      <div className="cards">
        <h1 className="fo">Üdvözöljük a Nyelvbázison!</h1>
        <h2 className="masodik">Nyelvbázis a legjobb online platform ahol könnyedén bővítheted a spanyol szókincsed kezdő szinttől a haladóig.
       Segít a spanyol nyelv gyors elsajátításában. Az oldal lehetővé teszi a felhasználók számára, hogy bővítsék szókincsüket a spanyol nyelven.</h2>
       <img src={LogoTongue} alt="Logo"/>
        <h3 className="harmadik">¡Vamos a aprender juntos!</h3>
        <div className="dives">
        <Link to="/startup"> <button className="linkes"> Bejelentkezés </button></Link> 
            
         <Link to="/register"> <button className="linkes"> Regisztráció </button></Link>
         </div>
                 
        <h4 className="negyedik">Készítette: Fegyverneki Tamás, Macsek Levente és Kapi Richárd</h4>
      </div>
    );
  }
  