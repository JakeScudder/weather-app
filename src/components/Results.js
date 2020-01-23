import React from 'react';
import {
  Container,
} from 'react-bootstrap';

//Components

import ResultsHeader from './ResultsHeader';

const Results = (props) => {
  let city = props.data.name;
  return (
  <Container>
    <ResultsHeader data={props.data} />
    <h5> {`Here is the weather in ${city}:`} </h5>
  </Container>
  )
};

export default Results;