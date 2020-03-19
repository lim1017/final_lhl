import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Form, Button, FormControl, NavDropdown } from "react-bootstrap";
import axios from "axios";
import appDataContext from "../../hooks/reducers/useContext";
import reducerz, { SET_USER } from "../../hooks/reducers/app";





function TomNav(props) {
  const [ loggedIn, setLoggedIn ] = useState({name:null, id:null});

  const [username, setUsername] = useState(    
    localStorage.getItem('username') || ''
  );


  //prevents refresh from logging you out.  updates local state everytime with local storage
  useEffect(() => {
    const user = localStorage.getItem('username');
    const userId = localStorage.getItem('id');

    setLoggedIn({name:user, id:userId})
  },[]);

  function logout(){
    localStorage.clear();
    
    setLoggedIn({name:null, id:null})
  }

  function login(e){

    Promise.all([
      axios.get(`http://localhost:8001/api/users/${username}`)
    ])
      .then(response => {
        console.log(response[0].data[0])

        const userz= response[0].data[0]

        localStorage.setItem('username', userz.name);
        localStorage.setItem('id', userz.id)
        setLoggedIn({name:userz.name, id:userz.id})
       
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
          
        <div className="nav-login-div textAlignRight">
        {loggedIn.name !== null ? (
          <p>Hello: {loggedIn.name}</p>
                  ) : null}
        {loggedIn.name !== null ? (
          <Button variant="outline-success" onClick={()=>logout()}>Logout</Button>
                  ) : null}
                  
        
        {loggedIn.name === null ? (
           <Form inline>
           <FormControl type="text" placeholder="Login" className="mr-sm-2"
             onChange={handleChangeName}
           />
           <Button variant="outline-success" onClick={()=>login()}>Login</Button>
           </Form>

        ) : null} 

         
        </div>        
      </Navbar>
    )
}

export default TomNav;
