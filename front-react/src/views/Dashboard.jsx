import React, { useContext, useState, useEffect } from "react";
import appDataContext from "../hooks/reducers/useContext";
import CardDashBoard from "./CardDashBoard";

import NewUserPg from "components/NewUserPg/NewUserPg.jsx";
import axios from "axios";


function Dashboard(props) {
  const { state } = useContext(appDataContext);


  const [isUserNew, setIsUserNew] = useState(true);
  const userId = localStorage.getItem('id');


  
  useEffect(() => {
  
    Promise.all([
      axios.get(`http://localhost:8001/api/users/${userId}`)
    ])
      .then(response => {
        setIsUserNew(response[0].data[0].isnew)
      })
      .catch(error => {
        console.log(error);
      });
  });



  function isOldUser(){
    Promise.all([
        axios.put(`http://localhost:8001/api/users/update/newuser`, {userId})
      ])
        .then(response => {
          setIsUserNew(false)

        })
        .catch(error => {
          console.log("no go");
        });

  }


  return (
    <>
    {isUserNew ? (
    <div className='dash-wrapper-newuser'>
      <div className='dash-img-newuser'>
        <NewUserPg oldUser={isOldUser} />
      </div>
    </div>
    ) : 
    <div className='dash-wrapper'>
      <div className='dash-img'> 
          <CardDashBoard state={state}></CardDashBoard>;
      </div>  
    </div>
    }   
    </>

  )
}

export default Dashboard;
