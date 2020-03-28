import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";
import CardSidebar from "../Card/CardSidebar.jsx";
import appDataContext from "../../hooks/reducers/useContext";
import logo from "assets/img/piggylogo2.png";
import { Button } from "react-bootstrap";
import AnimatedNumber from "react-animated-number";
import MUButton from "@material-ui/core/Button";

function Sidebar(props) {
  const { state, dispatch } = useContext(appDataContext);
  const [width, setWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [button1, setButton1] = useState({
    color: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)",
    x: 0
  });

  const style = {
    background: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)",
    borderRadius: 13,
    border: 0,
    color: "white",
    fontSize: 12
  };


  function logout() {
    localStorage.clear();

    setIsLoggedIn(false);
  }

  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  function updateDimensions() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    updateDimensions();

    const userId = localStorage.getItem("id");
    const user = localStorage.getItem("username");

    if (userId !== null) {
      setIsLoggedIn(true);
      setLoggedInUser(user);
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
                    <h4>
                      Literacy score:{" "}
                      <AnimatedNumber
                        value={state.users[0].literacy}
                        style={{
                          transition: "2.8s ease-out",
                          fontSize: 24,
                          transitionProperty: "background-color, color, opacity"
                        }}
                        frameStyle={perc =>
                          perc === 100 ? {} : { backgroundColor: "#fcfcfc" }
                        }
                        duration={1000}
                        formatValue={n => n.toFixed(0)}
                      />
                    </h4>
                  </div>
                  <div className="sidebar-content">
                    <Link to={`/welcome`} onClick={() => logout()}>
                      <MUButton
                        style={{
                          ...style,
                          background: button1.color,
                          height: 40 - button1.x,
                          width: 90 - button1.x,
                          margin: button1.x / 2
                        }}
                        onMouseLeave={() =>
                          setButton1({
                            ...button1,
                            color:
                              "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
                            x: 0
                          })
                        }
                        onMouseOver={() =>
                          setButton1({
                            ...button1,
                            color:
                              "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
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
                      >
                        Logout
                      </MUButton>
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
