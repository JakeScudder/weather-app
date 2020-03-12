import React, { Component } from 'react';
import {
  Container,
} from 'react-bootstrap';

class FiveDay extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
    } 
    this.backgroundRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetch5Day();
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

  adjustTemp = (temp) => {
    let rawTemp = Math.round(temp);
    let temperature = Math.trunc(rawTemp)
    return temperature
  }

  render() {
    this.waitForIt();
    let data = this.props.data;
    let days = [];

    if (data && data.list) {
      data = this.props.data.list
      console.log(data);
      let count = 1;
      for (let i = 5; i < data.length; i+= 8) {
        let predictedTemp = data[i].main.temp;
        let high = data[i].main.temp_max;
        let low = data[i].main.temp_min;
        predictedTemp = this.adjustTemp(predictedTemp)
        high = this.adjustTemp(high)
        low = this.adjustTemp(low)
        let d = new Date();
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        let month = months[d.getMonth()];
        let day = d.getDate();
        day = day += count;
        count += 1;
        days.push(<p key ={count} className="five-day-forecast"> {month},{day}: Temp:{predictedTemp}° Low:{low}° High:{high}°</p>) 
      }
    }
    return (
      <Container ref={this.backgroundRef}  id="resultsContainer">
      <div id="five-day-conditions">
        <h6 className="five-day-header">{`Current Conditions in ${this.props.city}:`}</h6>
        <h6 className="five-day-header">{this.props.conditions}</h6>
      </div>
        <div id="five-day"> 
          {days}
        </div>
      </Container>
      
    );
  }
} 

export default FiveDay;