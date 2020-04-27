import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

import axios from 'axios';
import googleKey from '../googleKey';
import uuid from 'react-uuid'


import { withRouter } from "react-router";

const SearchForm = (props) => {

  const [search, setSearch] = useState("");
  const [autofill, setArray] = useState("");
  const [showing, setShowing] = useState("");
  const [unique, setUnique] = useState(uuid());


  const handleSubmit = e => {
    e.preventDefault();
    let searchUrl = `/search/${search}`;
    props.history.push(searchUrl);
		props.handleSearch(search);
    setSearch("");
    setUnique(uuid());
  }

  const handleAutofillSubmit = e => {
    let query = e.target.innerText;
    e.preventDefault();
    let searchUrl = `/search/${query}`
    props.history.push(searchUrl);
		props.handleSearch(query);
    setSearch("");
    setTimeout(function(){setShowing(false)}, 400);
    setUnique(uuid());
  }

  const handleChange = e => {
    setSearch(e.target.value);

    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&key=${googleKey}&sessiontoken=${unique}`)
      .then(response => {
        if (response.data.predictions.length > 0) {
          setShowing(true);
        } else {
          setShowing(false);
        }
        setArray(response.data.predictions);
      })
	}

  return (
    <Form onSubmit={handleSubmit} inline>
      <FormGroup id="searchBarContainer">
        <FormControl
        id="searchBar" 
        type="text" 
        name="search" 
        placeholder="City, State (i.e. Denver, CO)" 
        value={search}
        onChange={handleChange}
        />
        <ul id="autofill" style={{display: showing ? 'block' : "none"}}>
          { showing && autofill.length > 1? 
            autofill.slice(0, 4).map(suggestion => {
              let description = suggestion.description.split(",")
              description.pop();
              console.log(description);
              description = description.join(", ")
              console.log(description);
            return <li key={suggestion.id} className="autofill-li" onClick={handleAutofillSubmit}>{description}</li>
            })
            : null
          }
        </ul>
      </FormGroup>
      <Button id="searchButton" type="submit">
        Search
      </Button>
    </Form>
  )
};

const SearchFormWithRouter = withRouter(SearchForm);
export default SearchFormWithRouter;