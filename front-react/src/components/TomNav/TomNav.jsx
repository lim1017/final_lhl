import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button, FormControl, NavDropdown } from "react-bootstrap";
import axios from "axios";




function TomNav(props) {

  const [username, setUsername] = useState(    
    localStorage.getItem('username') || ''
  );


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
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleChangeName(event){
    setUsername(event.target.value)
  }


    return(
      <Navbar bg="light" expand="lg">
        {/* <Navbar.Collapse className="ml-auto" id="basic-navbar-nav"> */}
        <div className="nav-login-div textAlignRight">
          <Form inline>
            <FormControl type="text" placeholder="Login" className="mr-sm-2"
              onChange={handleChangeName}
            />
            <Button variant="outline-success" onClick={()=>login()}>Login</Button>
          </Form>
        </div>        
        {/* </Navbar.Collapse> */}
      </Navbar>
    )
}

export default TomNav;
