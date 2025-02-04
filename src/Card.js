import React from 'react';

export default function Card({magyar_szo, spanyol_szo, mondatok}) {

  return (
    <div className="col-md-3" >
      
      <div>
        
          <div style={{ marginBottom: '10px' }}>
            <h3>{magyar_szo} - {spanyol_szo}</h3>
          </div>
     
      </div>

      {/* <h2>Magyar-Spanyol mondatok</h2>
      <div>
        {mondatok.map((mondat, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <h3>{mondat.magyar_mondatok}</h3>
            <h3>{mondat.spanyol_mondatok}</h3>
          </div>
        ))}
      </div> */}
    </div>
  );
}