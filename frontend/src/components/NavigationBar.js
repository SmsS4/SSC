import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import SearchFiled from './SearchField'

import styled from 'styled-components';
import { useHistory } from 'react-router';
const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;


function NavigationBar({onChange}) {
  const history = useHistory();
  console.log(history);

  return (
    <Styles>
    <Navbar expand="lg">
      {/* <Navbar.Brand>SCC</Navbar.Brand> */}
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav"/> */}
      <SearchFiled
        callback={(value) => {onChange(value, history)}}
        onChange={(value) => {onChange(value, history)}}
      />
      {/* <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form> */}
      {/* <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse> */}
    </Navbar>
  </Styles>
  )
}

export default NavigationBar

