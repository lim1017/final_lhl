import React from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/Grid";

function NewUserPg(props) {
  const username = localStorage.getItem("username");

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
