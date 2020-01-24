import React, { Component } from 'react';
import {
  Container,
} from 'react-bootstrap';
import Forecast from './Forecast';

import apiKeyFlickr from '../flickr'
import axios from 'axios';

import ResultsHeader from './ResultsHeader';

class Results extends Component {
  constructor (props) {
    super(props);
    this.state = {
      background: "",
      query: `${this.props.query}`,
      loading: true,
    } 
    this.backgroundRef = React.createRef();
  }

  componentDidMount() {
    this.handleFlickr(this.state.query);
  }

  //Fetch background Image
  handleFlickr = (query) => {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKeyFlickr}&tags=${query}&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
    .then(res => {
      let format = `url(${res.data.photos.photo[3].url_o})`;
      this.setState({
        background:format,
        loading: false
      })
      console.log(this.state.background);
      setTimeout(() => {
        this.setBackgroundImg();
      }, 1000);
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    },)
  }

  setBackgroundImg = () => {
    this.backgroundRef.current.style.background = this.state.background;
    this.backgroundRef.current.style.backgroundSize = "cover";
  }

 render() {
  return (
    <Container ref={this.backgroundRef}  id="resultsContainer">
      <ResultsHeader data={this.props.data} />
      <Forecast data={this.props.data} />
    </Container>
    )
 }
};

export default Results;

// style={{background:this.state.background}}