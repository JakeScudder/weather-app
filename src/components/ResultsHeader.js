import React from 'react';

const ResultsHeader = (props) => {
  let city = props.data.name
  
  //Latitude Longitude
  // let lat;
  // let lon;
  
  // if (props.data.coord && props.data.coord.lat) {
  //   lat = props.data.coord.lat
  //   lon = props.data.coord.lon
  // }
  
  return (
    <div>
      <div id="greetingCard">
          <h5 id="greetingBody"> {`Here is the weather in ${city}:`}</h5>
      </div>
      {/*Latitude not really needed*/}
      {/* <Card id="resHeadCard">
        <Card.Body id="resHeadBody">
          {`lat: ${lat}, lon: ${lon}`}
        </Card.Body>
      </Card> */}
    </div>
    
  )
}

export default ResultsHeader;