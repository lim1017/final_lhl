import React, { useContext } from "react";
import appDataContext from "../hooks/reducers/useContext";
import CardDashBoard from "./CardDashBoard";

function Dashboard(props) {
  const { state, dispatch } = useContext(appDataContext);

  return (

    <div className='dash-wrapper'>
      <div className='dash-img'> 
          <CardDashBoard state={state}></CardDashBoard>;
      </div>  
    </div>

  )
}

export default Dashboard;
