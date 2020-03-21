import React, { useContext } from "react";
import appDataContext from "../hooks/reducers/useContext";
import CardDashBoard from "./CardDashBoard";

function Dashboard(props) {
  const { state, dispatch } = useContext(appDataContext);

  return <CardDashBoard state={state}></CardDashBoard>;
}

export default Dashboard;
