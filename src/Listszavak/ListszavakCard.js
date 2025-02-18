
import React from 'react';

export default function ListSzavakCard({ magyar_szo, spanyol_szo, mondatok }) {
  return (
      <div className="kartya" >
        <div className="jo">
        <h3>{magyar_szo} - {spanyol_szo}</h3>
        {/* {Array.isArray(mondatok) && mondatok.length > 0 &&
          mondatok.map((mondat, index) => (
            <div className="szavak" style={{border: "2px solid green"}}>
              <h3>{mondat.magyar_mondatok}</h3>
              <h3>{mondat.spanyol_mondatok}</h3>
            </div>
          ))
        } */}
      </div>
      </div>
  );
}
