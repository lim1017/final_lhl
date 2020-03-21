import React, { useContext } from "react";
import axios from "axios";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import CardGoals from "components/Card/CardGoals.jsx";
import Goal from "components/Goal/index.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import appDataContext from "../hooks/reducers/useContext";
import CardExplained from "components/Card/CardExplained";

function Goals(props) {
  const { state, dispatch } = useContext(appDataContext);

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
    <>
      <Grid item xs={6}>
        <h2>Set Some Goals!</h2>
        <CardGoals
          state={state}
          setGoal={setGoal}
          // goal={goal}
          GoalsInList={GoalsInList}
        ></CardGoals>
      </Grid>
      <Grid item xs={6}>
        <CardExplained></CardExplained>
      </Grid>
    </>
  );
}

export default Goals;
