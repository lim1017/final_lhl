import React, { useContext } from "react";
import axios from "axios";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Goal from "components/Goal/index.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import appDataContext from "../hooks/reducers/useContext";

function Goals(props) {
  const{ state, dispatch } = useContext(appDataContext);

  const setGoal = (id, goal) => {
    return new Promise((res, rej) => {
     
      axios
        .put(`http://localhost:8001/api/goals/${id}`, goal)
        .then(res1 => {
          axios.get("http://localhost:8001/api/goals").then(res2 => {
            dispatch({
              ...state,
              type: "SET_DATA",
              goals: res2.data
            });
            res(res2);
          });
        })
        .catch(error => {
          rej(error);
        });
    });
  };

  const deleteGoal = id => {
    return new Promise((res, rej) => {

      axios
        .delete(`http://localhost:8001/api/goals/${id}`)
        .then(res1 => {
          axios.get("http://localhost:8001/api/goals").then(res2 => {
            dispatch({
              ...state,
              type: "SET_DATA",
              goals: res2.data
            });
            res(res2);
          });
        })
        .catch(error => {
          rej(error);
        });
    });
  };

  const GoalsInList = state.goals.map(goal => {
    return (

      <Goal
        key={goal.id}
        id={goal.id}
        name={goal.name}
        category="Here is a subtitle for this table"
        type={goal.type}
        amount={goal.amount}
        description={goal.description}
        date={goal.date}
        setGoal={setGoal}
        deleteGoal={deleteGoal}
      />
    );
  });

  return (
    <div className="content">
      <h3>Goals</h3>

      {/* {state.goals.length===0 ? (
        <p>SET UP A GOAL</p>
      ) : null} */}

        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Goals"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    {GoalsInList}
                    <Goal
                      mode="new"
                      key={state.goals.length + 1}
                      id={state.goals.length + 1}
                      category="Here is a subtitle for this table"
                      date={`2020-01-05T05:00:00.000Z`}
                      setGoal={setGoal}
                    />
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      <StatsCard />
    </div>
  );

}

export default Goals;
