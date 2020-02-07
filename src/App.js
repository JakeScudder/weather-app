import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
//Bootstraps
import { Container, Jumbotron } from 'react-bootstrap';

//Components
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import Nav from './components/Nav';

//Fetch
import axios from 'axios';
import apiKey from './config';

//Images

// import oldTree from './images/oldTree.jpeg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      results: [],
      query: "",
      background: "",
      jumboSmall: true,
      loading: true
    }
    this.jumbo = React.createRef();
  }

  componentDidMount(){
    this.handleWeatherFetch();
  }

  
 setBackground = (query = "clear sky") => {
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
    if (query.includes("clear")) {
      console.log("in");
      this.setState({
        background: imageObject.clearSky
      })
      return;
    }
    if (query.includes("light rain")) {
      console.log("in");
      this.setState({
        background: imageObject.lightRain
      })
      return;
    }
    if (query.includes("moderate rain")) {
      console.log("in");
      this.setState({
        background: imageObject.moderateRain
      })
      return;
    }
    if (query.includes("heavy rain")) {
      console.log("in");
      this.setState({
        background: imageObject.HeavyRain
      })
      return;
    }
    if (query.includes("snow")) {
      console.log("in");
      this.setState({
        background: imageObject.lightSnow
      })
      return;
    }
    if (query.includes("clouds")) {
      console.log("in");
      this.setState({
        background: imageObject.scatteredCloud
      })
      return;
    } 
  }

  // Weather API call
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
        this.setBackground(this.state.query);
        // setTimeout(() => {
        //   console.log(this.state.query);
        //   this.handleFlickr(this.state.query);
        // }, 1000)
        
      })
      .catch(error => {
        console.log('Error fetching the weather data:', error)
      })
  }

  handleJumboStyle = () => {
    if (this.state.jumboSmall) {
      this.jumbo.current.style.height = "37.5%";
      this.setState({
        jumboSmall: false
      })
    } else {
      this.jumbo.current.style.height = "32%";
      this.setState({
        jumboSmall: true
      })
    }
  }

  render() {
    return (
      <HashRouter>
      <div className="App">
        <Jumbotron ref={this.jumbo}>
          <Container>
            <h3 id="appTitle">Weather The Elements</h3>
            <SearchForm 
              handleSearch={this.handleWeatherFetch}
            />
            <Nav jumbo={this.handleJumboStyle} fetchNav={this.handleWeatherFetch}/>
            
          </Container>
        </Jumbotron>
        {/* <Results data={this.state.results} background={this.state.background}/> */}
        <Switch>
              <Route exact path ="/"
              render={(props) => <Results {...props} data={this.state.results} background={this.state.background} /> }
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
              <Route exact path ="/CA"
              render={(props) => <Results {...props} data={this.state.results} background={this.state.background} /> }
              />
            </Switch>
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
