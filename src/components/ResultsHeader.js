import React from 'react';
import {
  Card,
} from 'react-bootstrap';

const ResultsHeader = (props) => {
  let city = props.data.name
  let lat;
  let lon;
  if (props.data.coord && props.data.coord.lat) {
    lat = props.data.coord.lat
  }
  if (props.data.coord && props.data.coord.lon) {
    lon = props.data.coord.lon
  }
  return (
    <Card id="resHeadCard">
      <Card.Body id="resHeadBody">{`${city} ${lat}, ${lon}`}</Card.Body>
    </Card>
  )
}

export default ResultsHeader;