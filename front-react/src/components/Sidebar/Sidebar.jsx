import React, { useState, useContext, useEffect } from "react";

import { NavLink, Link } from "react-router-dom";

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";
import CardSidebar from "../Card/CardSidebar.jsx";
import appDataContext from "../../hooks/reducers/useContext";

import logo from "assets/img/piggylogo2.png";
import { Button } from "react-bootstrap";



function Sidebar(props) {
  
  const { state, dispatch } = useContext(appDataContext);
  const [width, setWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  console.log(state)


  function logout() {
    localStorage.clear();

    // this.setState({ isLoggedIn: false });
    setIsLoggedIn(false)
  }

  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  function updateDimensions() {
    // this.setState({ width: window.innerWidth });
    setWidth(window.innerWidth)
  }

  // componentDidMount() {
  //   this.updateDimensions();
  //   window.addEventListener("resize", this.updateDimensions.bind(this));

  //   const userId = localStorage.getItem("id");
  //   const user = localStorage.getItem("username");

  //   if (userId !== null) {
  //     this.setState({ isLoggedIn: true });
  //     this.setState({ loggedInUser: user });
  //   }
  // }

  useEffect(() => {
    updateDimensions();
    // window.addEventListener("resize", this.updateDimensions.bind(this));

    const userId = localStorage.getItem("id");
    const user = localStorage.getItem("username");

    if (userId !== null) {
      // this.setState({ isLoggedIn: true });
      // this.setState({ loggedInUser: user });

      setIsLoggedIn(true)
      setLoggedInUser(user)
    }
  }, []);


    const sidebarBackground = {
      backgroundImage: "url(" + props.image + ")"
    };

    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={props.color}
        data-image={props.image}
      >
        {props.hasImage ? (
          <div className="sidebar-background" style={sidebarBackground} />
        ) : null}
        <div className="logo">
          <a className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a className="simple-text logo-normal">PiggyBank</a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {width <= 991 ? <AdminNavbarLinks /> : null}
            {props.routes.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              else if (prop.name == "Portfolio")
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path + "/start"}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>

          {isLoggedIn ? (
            <div className="sidebar-card">
              <CardSidebar
                className="sidebar-name"
                statsIcon="fa fa-clock-o"
                title="Welcome"
                category={loggedInUser}
                content={
                  <div>
                    <div className="sidebar-literacy">
                      <h4>Literacty score:{state.users[0].literacy}</h4>
                    </div>
                    <div className="sidebar-content">
                      <Link to={`/welcome`} onClick={() => logout()}>
                        <Button variant="outline-success">
                          Logout
                        </Button>
                      </Link>
                    </div>
                  </div>
                }
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  
}

export default Sidebar;
