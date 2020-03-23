import React from "react";


function NewUserPg(props) {

  const username = localStorage.getItem('username');
    console.log(username)

  return (

    <>
    <div className='welcome-text-div'>
    <h2 className='welcome-text'>Welcome {username}!</h2>
    <h2 className='welcome-text'>Here at PiggyBank we believe in the power of financial literacy.  We will help you setup your goals, track and expenses, achieve your dreams.  </h2>
    </div>


  <div className='new-user'>
    <button className="new-user-button" onClick={()=>{
    console.log('clicked')
    props.oldUser()
    // localStorage.setItem("newUser", false);
    }}>Get Started Now</button>
  </div>  

  <div className='welcome-quote'>
    <h2 className='welcome-text'>Compound interest is the eighth wonder of the world. He who understands it, earns it … he who doesn't … pays it.
    </h2>
    <h3 style={{color:'white'}}>Albert Einstein</h3>
  </div>


    </>
  
  );
}

export default NewUserPg;
