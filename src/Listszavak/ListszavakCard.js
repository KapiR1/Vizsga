import React from 'react';

export default function ListSzavakCard({magyar_szo, spanyol_szo}) {
  return (
      <div className="kartya" >
        <div className="jo">
        <h3>{magyar_szo} - {spanyol_szo}</h3>
      </div>
      </div>
  );
}
