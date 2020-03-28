// imports & initialization
import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import axios from "axios";

import MUButton from "@material-ui/core/Button";

import { Redirect, Route } from "react-router-dom";

// exported function
function Login(props) {
  const [loggedIn, setLoggedIn] = useState({ name: null, id: null });

  const [username, setUsername] = useState(
    localStorage.getItem("username") || null
  );

  const [userExists, setUserExists] = useState(true);
  const [userExistsRegister, setUserExistsRegister] = useState(false);

  const [button1, setButton1] = useState({
    color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    x: 0
  });
  const [button2, setButton2] = useState({
    color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    x: 0
  });

  const style = {
    background: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    width: 105,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px #4a148c 30%",
    marginLeft: 0
  };


  function logout() {
    localStorage.clear();
    setUsername(null);
  }

  function login() {
    Promise.all([axios.get(`http://localhost:8001/api/account/${username}`)])
      .then(response => {
        if (response[0].data.length === 0) {
          setUserExists(false);
        } else {
          setUserExists(true);
          const userz = response[0].data[0];
          localStorage.setItem("username", userz.name);
          localStorage.setItem("id", userz.id);
          setLoggedIn({ name: userz.name, id: userz.id });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function register() {
    Promise.all([
      axios.put(`http://localhost:8001/api/account/register`, { username })
    ])
      .then(response => {
        if (response[0].status === 200) {
          setUserExistsRegister(true);
        } else {
          // localStorage.setItem("newUser", true);
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
          style={{ marginRight: "10px" }}
          type="text"
          placeholder="Login"
          className="mr-sm-2"
          onChange={handleChangeName}
        />

        {/* <Button
          style={{ width: "10rem", background: "#ffe7ea" }}
          variant="outline-success"
          onClick={() => login()}
        >
          Login
        </Button> */}
        <MUButton
          style={{
            ...style,
            background: button1.color,
            width: 105 - button1.x,
            marginLeft: button1.x
          }}
          onMouseLeave={() =>
            setButton1({
              ...button1,
              color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)"
            })
          }
          onMouseOver={() =>
            setButton1({
              ...button1,
              color: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
            })
          }
          onMouseUp={() =>
            setButton1({
              ...button1,
              x: 0
            })
          }
          onMouseDown={() =>
            setButton1({
              ...button1,
              x: 2
            })
          }
          onClick={() => login()}
        >
          Login
        </MUButton>
      </Form>
      <br></br>

      <Form inline>
        <FormControl
          style={{ marginRight: "10px" }}
          type="text"
          placeholder="Register"
          className="mr-sm-2"
          onChange={handleChangeName}
        />

        <MUButton
          style={{
            ...style,
            background: button2.color,
            width: 105 - button2.x,
            marginLeft: button2.x
          }}
          onMouseLeave={() =>
            setButton2({
              ...button2,
              color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
              x: 0
            })
          }
          onMouseOver={() =>
            setButton2({
              ...button2,
              color: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
            })
          }
          onMouseUp={() =>
            setButton2({
              ...button2,
              x: 0
            })
          }
          onMouseDown={() =>
            setButton2({
              ...button2,
              x: 2
            })
          }
          onClick={() => register()}
        >
          Register
        </MUButton>
      </Form>

      {userExists === false ? (
        <p style={{ color: "red" }}>username does not exist please register</p>
      ) : null}

      {userExistsRegister ? (
        <p style={{ color: "red" }}>User Already exists choose a new name</p>
      ) : null}
    </div>
  );
}

export default Login;
