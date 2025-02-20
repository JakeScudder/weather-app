import React, { Component } from 'react';
import {
  Container,
} from 'react-bootstrap';
import Forecast from './Forecast';



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
      <Container ref={this.backgroundRef} className="animated fadeIn" id="resultsContainer">
        <Forecast data={this.props.data} />
      </Container>
    )
 }
};

export default Results;

// style={{background:this.state.background}}