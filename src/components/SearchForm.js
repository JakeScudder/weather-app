import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

import axios from 'axios';
import googleKey from '../googleKey';


import { withRouter } from "react-router";

const SearchForm = (props) => {

  const [search, setSearch] = useState("")

  const handleSubmit = e => {
    e.preventDefault();
    let searchUrl = `/search/${search}`;
    props.history.push(searchUrl);
		props.handleSearch(search);
		setSearch("");
  }

  const handleChange = e => {
    setSearch(e.target.value);
    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&key=${googleKey}&sessiontoken=1234567890`)
      .then(response => {
        console.log(response);
      })
	}

  return (
    <Form onSubmit={handleSubmit} inline>
      <FormGroup id="searchBarContainer">
        <FormControl
        id="searchBar" 
        type="search" 
        name="search" 
        placeholder="City, State (i.e. Denver, CO)" 
        value={search}
        onChange={handleChange}
        />
      </FormGroup>
      {' '}
      <Button id="searchButton" type="submit">
        Search
      </Button>
    </Form>
  )
};

const SearchFormWithRouter = withRouter(SearchForm);
export default SearchFormWithRouter;