import React from "react";
import { Navbar } from "react-bootstrap";



function TomNav(props) {

    return(
      <div style={{display:'flex', justifyContent:'space-between'}}>
    <Navbar >
      <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">Mark Otto</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
      </div>
    )
}

export default TomNav;
