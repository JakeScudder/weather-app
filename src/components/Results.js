import React, { Component } from 'react';
import {
  Container,
} from 'react-bootstrap';
import Forecast from './Forecast';

import { Animated } from 'react-animated-css';


class Results extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
    } 
    this.backgroundRef = React.createRef();
  }

  waitForIt = () => {
    setTimeout(() => {
      this.setBackgroundImg();
    }, 1000)
  }
  
  setBackgroundImg = () => {
    this.backgroundRef.current.style.background = this.props.background;
    this.backgroundRef.current.style.backgroundSize = "cover";
    this.backgroundRef.current.style.minHeight = "50%";
    this.backgroundRef.current.style.position = "relative";

  }

 render() {
   this.waitForIt();
  return (
    <Animated animationIn="fadeIn" animationInDelay="1000">
      <Container ref={this.backgroundRef}  id="resultsContainer">
        <Forecast data={this.props.data} />
      </Container>
    </Animated>
    )
 }
};

export default Results;

// style={{background:this.state.background}}