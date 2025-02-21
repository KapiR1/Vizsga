import React from 'react';

export default function ListMondatokCard({magyar_mondat, spanyol_mondat}) {
  return (
      <div className="kartya" >
        <div>
        <h3>{magyar_mondat} - {spanyol_mondat}</h3>
      </div>
      </div>
  );
}
