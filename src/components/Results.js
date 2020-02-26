import React, { Component } from 'react';
import {
  Container,
} from 'react-bootstrap';
import Forecast from './Forecast';

import Footer from './Footer';


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
    this.backgroundRef.current.style.height = "52.5%";
  }

 render() {
   this.waitForIt();
  return (
    <Container ref={this.backgroundRef}  id="resultsContainer">
      <Forecast data={this.props.data} />
      <Footer />
    </Container>
    )
 }
};

export default Results;

// style={{background:this.state.background}}