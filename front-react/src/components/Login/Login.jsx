import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Form, Button, FormControl, NavDropdown } from "react-bootstrap";
import axios from "axios";

import { Link, useRouteMatch, Redirect, Route } from "react-router-dom";






function Login(props) {
  const [ loggedIn, setLoggedIn ] = useState({name:null, id:null});

  const [username, setUsername] = useState(    
    localStorage.getItem('username') || ''
  );


  //prevents refresh from logging you out.  updates local state everytime with local storage
  useEffect(() => {
    const user = localStorage.getItem('username');
    const userId = localStorage.getItem('id');
    console.log(userId)
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
        // this.props.history.push('/admin/expenses')

      })
      .catch(error => {
        console.log(error);
      });

      // return <Redirect to='/admin/expenses' />


  }

  

  function handleChangeName(event){
    setUsername(event.target.value)
  }


    return(

      <switch>
      <div>
      
        {loggedIn.id !== null ? (
          <>
          <Button variant="outline-success" onClick={()=>logout()}>Logout</Button>
          <Route exact path="/welcome">
            {loggedIn ? <Redirect to="/admin/expenses" /> : null}
          </Route>
          </>
                  ) : null}
                  
        
        {loggedIn.id === null ? (
           <Form inline>
           <FormControl type="text" placeholder="Login" className="mr-sm-2"
             onChange={handleChangeName}
           />
          
          {/* <Link to={`/admin/expenses`} c> */}

           <Button variant="outline-success" onClick={()=>login()}>Login</Button>

          {/* </Link> */}

           </Form>

        ) : null} 

         
      </div>  
      </switch>      
     
    )
}

export default Login;
