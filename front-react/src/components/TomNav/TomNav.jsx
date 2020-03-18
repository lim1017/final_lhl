import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button, FormControl, NavDropdown } from "react-bootstrap";
import axios from "axios";




function TomNav(props) {

  const [username, setUsername] = useState(    
    localStorage.getItem('username') || ''
  );

  const [loggedIn, setLoggedIn] = useState(false)    



  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);


  function login(e){
    console.log('loging')

    Promise.all([
      axios.get(`http://localhost:8001/api/users/${username}`)
    ])
      .then(response => {
        console.log(response[0].data[0])
        localStorage.setItem('username', response[0].data[0].name);
        localStorage.setItem('id', response[0].data[0].id)
        setLoggedIn(true)
      })
      .catch(error => {
        console.log(error);
      });
  }

  function logout(){
    // localStorage.setItem('id', null)
    // localStorage.setItem('username', null)
    // setLoggedIn(false)
    localStorage.clear();
  }

  function handleChangeName(event){
    setUsername(event.target.value)
  }


    return(
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="ml-auto" id="basic-navbar-nav">
      {localStorage.getItem('id') ? (
                    <div>
                    <p>logged in as {localStorage.getItem('username')} </p>
                    <Button variant="outline-success" onClick={()=>logout()}>Logout</Button>
                    </div>
                  ) : null}
        <Form inline>
          <FormControl type="text" placeholder="Login" className="mr-sm-2"             onChange={handleChangeName}
          />
          <Button variant="outline-success" onClick={()=>login()}>Login</Button>
        </Form>
        
      </Navbar.Collapse>
    </Navbar>
    )
}

export default TomNav;
