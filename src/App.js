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
import apiKeyFlickr from './flickr'


//Images
import Hammer from './images/hammer.jpeg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      results: [],
      query: "",
      background: "",
      loading: true
    }
  }

  componentDidMount(){
    this.handleWeatherFetch();
  }

  //Fetch background Image
  handleFlickr = (query) => {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKeyFlickr}&tags=${query}&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
    .then(res => {
      let format = `url(${res.data.photos.photo[7].url_o})`;
      this.setState({
        background: format,
        loading: false
      })
      console.log(res.data);
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    },)
  }

  handleWeatherFetch = (query = "charlottesville") => {
    this.setState({
      loading: true
    })
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&APPID=${apiKey}`)
      .then(res => {
        let query = res.data.weather[0].description
        this.setState({
          results: res.data,
          query: query,
          loading: false
        })
        setTimeout(() => {
          console.log(this.state.query);
          this.handleFlickr(this.state.query);
        }, 1000)
        
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
        <Results data={this.state.results} background={this.state.background}/>
      </div>
      </HashRouter>
      
    );
  }
}

export default App;
