import React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

const SearchForm = () => {
  return (
    <Form inline>
      <FormGroup controlId="formInlineEmail">
        <FormControl type="search" placeholder="What's the weather like in..." />
      </FormGroup>
      {' '}
      <Button type="submit">
        search
      </Button>
    </Form>
  )
};

export default SearchForm;