import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
//Bootstraps
import { Container, Jumbotron } from 'react-bootstrap';

//Components
import SearchForm from './components/SearchForm';
import Results from './components/Results';

//Fetch
import axios from 'axios';
import apiKey from './config';

//Images
import Hammer from './images/hammer.jpeg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      results: [],
      loading: true
    }
  }

  componentDidMount(){
    this.handleWeatherFetch();
  }

  handleWeatherFetch = (query = "charlottesville") => {
    this.setState({
      loading: true
    })
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${apiKey}`)
      .then(res => {
        this.setState({
          results: res.data,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching the weather data:', error)
      })
  }
  render() {
    return (
      <HashRouter>
      <div className="App">
        <Jumbotron>
          <Container>
            <h1>Weather App</h1>
            <p>
              Weather App Under Construction
            </p>
            <img id="construction" src={Hammer} alt="underConstruction"/>
          
            <SearchForm 
              handleSearch={this.handleWeatherFetch}
            />
          </Container>
        </Jumbotron>
        <Results data={this.state.results}/>
      </div>
      </HashRouter>
      
    );
  }
}

export default App;
