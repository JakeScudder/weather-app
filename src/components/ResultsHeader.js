import React from 'react';
import {
  Card,
} from 'react-bootstrap';

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
      <Card id="greetingCard">
        <Card.Body id="greetingBody">
          <h5 > {`Here is the weather in ${city}:`} </h5>
        </Card.Body>
      </Card>
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