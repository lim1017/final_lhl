import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "./views/index.scss";

import AdminLayout from "layouts/Admin.jsx";
import WelcomeLayout from "layouts/Welcome.jsx";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("id") !== null ? (
        <AdminLayout {...props} />
      ) : (
        <Redirect to="/welcome" />
      )
    }
  />
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/welcome" render={props => <WelcomeLayout {...props} />} />

      <PrivateRoute
        path="/admin/"
        render={props => <AdminLayout {...props} />}
      />
      {/* <Route
        path="/admin/dashboard"
        render={props => <AdminLayout {...props} />}
      /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
