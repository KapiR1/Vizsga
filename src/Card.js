import React from 'react';

export default function Card({szavak, mondatok}) {

  return (
    <div>
      <h2>Magyar-Spanyol szavak</h2>
      <div>
        {szavak.map((szo, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <h3>{szo.magyar_szo}</h3>
            <h3>{szo.spanyol_szo}</h3>
          </div>
        ))}
      </div>

      <h2>Magyar-Spanyol mondatok</h2>
      <div>
        {mondatok.map((mondat, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <h3>{mondat.magyar_mondatok}</h3>
            <h3>{mondat.spanyol_mondatok}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}