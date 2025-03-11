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
         <br/>
         <div className="container">
    <h3 id="felirat">Miért válaszd a mi platformunkat?</h3>
    <br/>
    <ul>
        <li>
            <strong>Ingyenes hozzáférés:</strong> Nincs szükség előfizetésre, vagy bármilyen rejtett költségre. Minden, amit a nyelvtanuláshoz szükséges, ingyenesen elérhető!
        </li>
        <br/>
        <li>
            <strong>Rugalmasság:</strong> Akár otthon, akár úton, vagy a munkahelyeden – a spanyol nyelv elsajátításához bárhol és bármikor hozzáférhetsz. A platformunk mobilbarát, így mindig a kezed ügyében lesz!
        </li>
        <br/>
        <li>
            <strong>Vizsga lehetőség:</strong> Az elméleti tudásod mellé gyakorlati tudást is szerezhetsz. Oldalunk lehetőséget biztosít arra, hogy vizsgát tegyél és hiteles bizonyítványt szerezz a spanyol nyelv tudásodról.
        </li>
        <br/>
        <li>
            <strong>Szintre szabott tanulás:</strong> Akár most kezded, akár már haladó szinten vagy, a platformunkon lévő tananyagok minden szintnek megfelelően kerültek kialakításra. A kezdőtől a haladó szintig, mindent megtalálsz, amit szükséges tudni.
        </li>
        <br/>
    </ul>
    <br/>
    <p>Ne hagyd ki ezt a lehetőséget! Kezd el a spanyol nyelv tanulását most, és érj el valódi eredményeket – mindezt teljesen ingyenesen!</p>
    <h4 className="negyedik">Készítette: Fegyverneki Tamás, Macsek Levente és Kapi Richárd</h4>
</div>

</div>
      
    );
  }
  