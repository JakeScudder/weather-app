import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import SearchForm from './components/SearchForm';

function App() {
  return (
    <div className="App">
      <Jumbotron>
        <Container>
          <h1>Weather App</h1>
          <p>
            I am building a weather app.
          </p>
        
          <SearchForm />
        </Container>
      </Jumbotron>
    </div>
  );
}

export default App;
