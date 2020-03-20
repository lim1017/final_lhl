import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  NavDropdown
} from "react-bootstrap";
import axios from "axios";

import { Link, useRouteMatch, Redirect, Route } from "react-router-dom";

function Login(props) {
  const [loggedIn, setLoggedIn] = useState({ name: null, id: null });

  const [username, setUsername] = useState(
    localStorage.getItem("username") || null
  );

  const [userExists, setUserExists] = useState(true);
  const [userExistsRegister, setUserExistsRegister] = useState(false);

  //prevents refresh from logging you out.  updates local state everytime with local storage
  useEffect(() => {
    const user = localStorage.getItem("username");
    const userId = localStorage.getItem("id");
    console.log(userId);
    // setLoggedIn({name:user, id:userId})
  }, []);

  function logout() {
    localStorage.clear();
    setUsername(null);
    // setLoggedIn({name:null, id:null})
  }

  function login() {
    Promise.all([axios.get(`http://localhost:8001/api/account/${username}`)])
      .then(response => {
        if (response[0].data.length === 0) {
          console.log("user doesnt exist");
          setUserExists(false);
        } else {
          setUserExists(true);
          const userz = response[0].data[0];
          localStorage.setItem("username", userz.name);
          localStorage.setItem("id", userz.id);
          setLoggedIn({ name: userz.name, id: userz.id });
          // this.props.history.push('/admin/expens
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function register() {
    console.log(username);
    Promise.all([
      axios.put(`http://localhost:8001/api/account/register`, { username })
    ])
      .then(response => {
        console.log(response);
        if (response[0].status === 200) {
          setUserExistsRegister(true);
        } else {
          login();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleChangeName(event) {
    setUsername(event.target.value);
  }

  return (
    <switch>
      <div>
        {loggedIn.id !== null ? (
          <>
            <Button variant="outline-success" onClick={() => logout()}>
              Logout
            </Button>
            <Route exact path="/welcome">
              {loggedIn ? <Redirect to="/admin/dashboard" /> : null}
            </Route>
          </>
        ) : null}

        <Form inline>
          <FormControl
            type="text"
            placeholder="Login"
            className="mr-sm-2"
            onChange={handleChangeName}
          />

          <Button variant="outline-success" onClick={() => login()}>
            Login
          </Button>
        </Form>
        <br></br>

        <Form inline>
          <FormControl
            type="text"
            placeholder="Register"
            className="mr-sm-2"
            onChange={handleChangeName}
          />

          <Button variant="outline-success" onClick={() => register()}>
            Register
          </Button>
        </Form>

        {userExists === false ? (
          <p style={{ color: "red" }}>
            username does not exist please register
          </p>
        ) : null}

        {userExistsRegister ? (
          <p style={{ color: "red" }}>User Already exists choose a new name</p>
        ) : null}
      </div>
    </switch>
  );
}

export default Login;
