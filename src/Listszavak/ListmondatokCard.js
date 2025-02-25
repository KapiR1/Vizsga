import React from 'react';

export default function ListMondatokCard({magyar_mondat, spanyol_mondat}) {
  return (
    <div className="kartya row">
    <div className= "col-md-4">
      <h3>{magyar_mondat}</h3>
    </div>
    <div className= "col-md-4">
      -
    </div>
    <div className= "moka col-md-4">
      <h3>{spanyol_mondat}</h3>
    </div>
  </div>
  );
}
