import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
//Bootstraps
import { Container, Jumbotron } from 'react-bootstrap';

//Components
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import Nav from './components/Nav';
import Footer from './components/Footer';
import FiveDay from './components/FiveDay';

//Fetch
import axios from 'axios';
import apiKey from './config';
const cityData = require('./city.list.json');

//Images

// import oldTree from './images/oldTree.jpeg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      locationCode: "",
      city: "",
      state: "",
      results: [],
      fiveday: [],
      conditions: "",
      background: "",
      jumboSmall: true,
      loading: true
    }
    this.jumbo = React.createRef();
  }

  componentDidMount(){
    this.handleWeatherFetch();
  }

  
 setBackground = (conditions = "clear sky") => {
    const imageObject = {
      clearSky: "url(https://live.staticflickr.com/4671/40268815811_1244a6b370_z.jpg)",
      lightRain: "url(https://live.staticflickr.com/3906/14674848444_e04aeab462.jpg)",
      moderateRain: "url(https://live.staticflickr.com/4576/24410968298_7e29e77769.jpg)",
      heavyRain: "url(https://live.staticflickr.com/4017/4394669806_ab806947fb_z.jpg)",
      lightSnow:"url(https://live.staticflickr.com/4746/25604711047_5f06f28d8b.jpg)" ,
      moderateSnow: "url(https://live.staticflickr.com/4746/25604711047_5f06f28d8b.jpg)",
      heavySnow: "url(https://live.staticflickr.com/4746/25604711047_5f06f28d8b.jpg)",
      scatteredCloud:"url(https://live.staticflickr.com/3229/2887338950_0a190905a1.jpg)" ,
      overcastCloud: "url(https://live.staticflickr.com/3229/2887338950_0a190905a1.jpg)",
    }
    this.setState({
      background: imageObject.clearSky
    })
    if (conditions.includes("clear")) {
      this.setState({
        background: imageObject.clearSky
      })
      return;
    }
    if (conditions.includes("rain")) {
      this.setState({
        background: imageObject.lightRain
      })
      return;
    }
    if (conditions.includes("light rain")) {
      this.setState({
        background: imageObject.lightRain
      })
      return;
    }
    if (conditions.includes("moderate rain")) {
      this.setState({
        background: imageObject.moderateRain
      })
      return;
    }
    if (conditions.includes("heavy rain")) {
      this.setState({
        background: imageObject.HeavyRain
      })
      return;
    }
    if (conditions.includes("snow")) {
      this.setState({
        background: imageObject.lightSnow
      })
      return;
    }
    if (conditions.includes("clouds")) {
      this.setState({
        background: imageObject.scatteredCloud
      })
      return;
    } 
  }

  //Runs fetch api with the city code to get precise weather
  findCityCode = (city = 'Charlottesville', state = "VA") => {
    console.log(city, state);
    this.setState({
      city: city,
      state: state,
    })
    for (let i = 0; i < cityData.length; i++) {
      if (city === cityData[i].name && state === cityData[i].state) {
        let code = cityData[i].id
        console.log(cityData[i].id);
        this.handleWeatherFetch(code)
      }
    }
  }

  // Weather API call
  handleWeatherFetch = (code = 4752031) => {
    this.setState({
      loading: true,
      locationCode: code,
    })
    axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${code}&units=imperial&APPID=${apiKey}`)
      .then(res => {
        let conditions = res.data.weather[0].description
        this.setState({
          results: res.data,
          conditions: conditions,
          loading: false
        })
        this.setBackground(this.state.conditions);     
      })
      .catch(error => {
        console.log('Error fetching the weather data:', error)
      })
  }

  //Taking the search parameters, separating them into City and State in order to then find the city code
  handleSearch = (query) => {
    let array = query.split(',');
    let city = array[0];
    let state = array[1];
    state = state.replace(/\s+/g, '');
    let cityCapitalized = city.charAt(0).toUpperCase() + city.slice(1);
    state = state.toUpperCase();
    this.findCityCode(cityCapitalized, state);
  }

  fetchFiveDay = () => {
    let code = this.state.locationCode;
    this.setState({
      loading: true
    })
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${code}&units=imperial&APPID=${apiKey}`)
      .then(response => {
        console.log(response)   
        this.setState({
          fiveday: response.data,
          loading: false,
        }) 
        this.setBackground(this.state.conditions);  
      })
      .catch(error => {
        console.log('Error fetching the weather data:', error)
      })
  }

  render() {
    return (
      <HashRouter >
      <div className="App">
        <Jumbotron>
          <Container>
            <h5 id="appTitle">BlueJay Weather</h5>
            <SearchForm 
              handleSearch={this.handleSearch}
            />
            <Nav fetchNav={this.handleSearch}/>
            
          </Container>
        </Jumbotron>
        {/* <Results data={this.state.results} background={this.state.background}/> */}
        <Switch>
          <Route exact path ="/"
          render={(props) => <Results {...props} city={this.state.city} state={this.state.state} data={this.state.results} background={this.state.background} /> }
          />
          <Route exact path ="/link1"
          render={(props) => <Results {...props} data={this.state.results} background={this.state.background} /> }
          />

          <Route exact path ="/link2"
          render={(props) => <Results {...props} data={this.state.results} background={this.state.background} /> }
          />
          <Route exact path ="/link3"
          render={(props) => <Results {...props} data={this.state.results} background={this.state.background} /> }
          />
          <Route exact path ="/search/:query"
          render={(props) => <Results {...props} data={this.state.results} background={this.state.background} /> }
          />
          <Route exact path ="/five-day"
          render={(props) => <FiveDay {...props} data={this.state.fiveday} background={this.state.background} /> }
          />
        </Switch>
        <Footer fetch5Day={this.fetchFiveDay} />
      </div>
      </HashRouter>
      
    );
  }
}

export default App;


 

//***** Working Flickr Fetch: 

/* Does not retrieve optimal images based on weather description. Increases Load times.  May use later for something. Checks for image, reduces image size link; */


// reFormat = (format) => {
//   let editFormat = format.substring(0, format.lastIndexOf("_"));
//   format = `${editFormat}_z.jpg`;
//   console.log(format);
//   this.setState({
//     background: format,
//     loading: false
//   }) 
// }
// //Fetch background Image
// handleFlickr = (query) => {
//   console.log(query);
//   let num = Math.floor(Math.random() * 20);
//   this.setState({
//     loading: true
//   })
//   axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKeyFlickr}&tags=${query}&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
//   .then(res => {
//     console.log(res.data.photos)
//     let format = `url(${res.data.photos.photo[num].url_o})`;  
//     for(let i = 0; i < 20; i++) {
//       if (format === "url(undefined)") {
//         console.log("+1");
//         format = `url(${res.data.photos.photo[i].url_o})`
//         i++
//       } else {
//         this.reFormat(format);
//       } 
//     }
//   })
//   .catch(error => {
//     console.log('Error fetching and parsing data', error)
//   },)
// }
