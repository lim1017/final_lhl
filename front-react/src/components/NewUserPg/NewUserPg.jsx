import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/Grid";
import MUButton from '@material-ui/core/Button';

function NewUserPg(props) {
  const username = localStorage.getItem("username");
  const [button1, setButton1] = useState({color: 'linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)', x: 0});

  const style = {
    background: 'linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)',
    borderRadius: 25,
    border: 0,
    color: 'white',
    fontSize: 16,
    height: 100,
    padding: '0 50px 0 50px',
    boxShadow: '0 3px 5px 2px #4a148c 30%',
    marginLeft: 0,
  };

  return (
    <>
      <div className="welcome-text-div">
        <h2 className="welcome-text">Welcome {username}!</h2>
        <Card
          style={{
            maxWidth: 500,
            maxHeight: 175,
            fontWeight: 900,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center"
          }}
        >
          <TextField>
            Here at PiggyBank we believe in the power of financial literacy.
            <br></br>
            <br></br>
            Let us help you achieve your financial dreams through the power of
            goal setting, smart budgeting, expense tracking and portfolio
            management.
            <br></br>
            <br></br>
            Learn a few things on the way too! Let's get started!
          </TextField>
        </Card>
      </div>

      <div className="new-user">

      <MUButton
          style={{
            ...style,
            background: button1.color,
            width: 270 - button1.x,
            marginLeft: button1.x,
          }}
          onMouseLeave={() => setButton1({
            ...button1,
            color: 'linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)'
          })}
          onMouseOver={() => setButton1({
            ...button1,
            color: 'linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)'
          })}
          onMouseUp={() => setButton1({
            ...button1,
            x: 0
          })}
          onMouseDown={() => setButton1({
            ...button1,
            x: 1
          })}
          onClick={() => {
            console.log("clicked");
            props.oldUser();
          }}
        >
          Get Started Now
        </MUButton>

        <button
          className="new-user-button"
          onClick={() => {
            console.log("clicked");
            props.oldUser();
            // localStorage.setItem("newUser", false);
          }}
        >
          Get Started Now
        </button>
      </div>

      {/* <div className='welcome-quote'>
    <h2 className='welcome-text'>Compound interest is the eighth wonder of the world. He who understands it, earns it … he who doesn't … pays it.
    </h2>
    <h3 style={{color:'white'}}>Albert Einstein</h3>
  </div> */}
    </>
  );
}

export default NewUserPg;
