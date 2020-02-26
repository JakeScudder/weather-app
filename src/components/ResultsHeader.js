import React from 'react';

const ResultsHeader = (props) => {
  let city = props.data.name

  return (
    <div>
      <div id="greetingCard">
          <h3 id="greetingBody">{city}</h3>
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