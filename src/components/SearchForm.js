import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

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
	}

  return (
    <Form onSubmit={handleSubmit} inline>
      <FormGroup controlId="searchBar">
        <FormControl 
        type="search" 
        name="search" 
        placeholder="What's the weather like in..." 
        value={search}
        onChange={handleChange}
        />
      </FormGroup>
      {' '}
      <Button id="searchButton" type="submit">
        search
      </Button>
    </Form>
  )
};

const SearchFormWithRouter = withRouter(SearchForm);
export default SearchFormWithRouter;