import React from 'react';

export default function ListSzavakCard({magyar_szo, spanyol_szo}) {
  return (
      <div className="kartya row">
        <div className= "col-md-4">
          <h3>{magyar_szo}</h3>
        </div>
        <div className= "col-md-4">
          -
        </div>
        <div className= " moka col-md-4">
          <h3>{spanyol_szo}</h3>
        </div>
      </div>
  );
}
