import React, { Component } from 'react';
import {
  Container,
} from 'react-bootstrap';

// import { Animated } from 'react-animated-css';


class FiveDay extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
    } 
    this.backgroundRef = React.createRef();
  }

  componentDidMount() {
    console.log("mounted");
    setTimeout(() => {
      this.props.fetch5Day();
    }, 800)
  }
  
  waitForIt = () => {
    setTimeout(() => {
      this.setBackgroundImg();
    }, 900)
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
      let countTwo = 10;
      let countThree = 20;
      let countFour = 30;
      for (let i = 5; i < data.length; i+= 8) {
        let predictedTemp = data[i].main.temp;
        // let high = data[i].main.temp_max;
        // let low = data[i].main.temp_min;
        predictedTemp = this.adjustTemp(predictedTemp)
        // high = this.adjustTemp(high)
        // low = this.adjustTemp(low)
        let weather = data[i].weather[0].description;
        weather = weather.charAt(0).toUpperCase() + weather.slice(1);
        let wind = data[i].wind.speed;
        wind = this.adjustTemp(wind);
        let d = new Date();
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        let month = months[d.getMonth()];
        let day = d.getDate();
        day = day += count;
        count += 1;
        countTwo += 1;
        countThree += 1;
        countFour += 1;
        days.push(<p key ={count} className="five-day-forecast"> {month} {day}: </p>)
        days.push(<p key ={countTwo} className="five-day-desc">Temp: {predictedTemp}° </p>) 
        days.push(<p key ={countThree} className="five-day-desc">Conditions: {weather}</p>) 
        days.push(<p key ={countFour} className="five-day-desc">Wind: {wind}mph</p>) 
      }
    }
    return (
      // <Animated animationIn="fadeIn" animationInDelay="500">
        <Container ref={this.backgroundRef} className="animated fadeIn"  id="fiveDayContainer">
        <div id="five-day-conditions">
          <h6 className="five-day-header">{`Current Conditions in ${this.props.city}:`}</h6>
          <h6 className="five-day-header">{this.props.conditions}</h6>
        </div>
          <div id="five-day"> 
            {days}
          </div>
        </Container>
      //* </Animated> */
    );
  }
} 

export default FiveDay;