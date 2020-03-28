import React, { useContext } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Goal from "components/Goal/index.jsx";
import appDataContext from "../hooks/reducers/useContext";
import CardGoalsTips from "./CardGoalsTips";
import CardGoals from "./CardGoals";
import reducerz, { SET_USER } from "../hooks/reducers/app";

function Goals(props) {
  const { state, dispatch } = useContext(appDataContext);

  const setGoal = (id, goal) => {
    const user = localStorage.getItem("id");

    var scoreUp = false;

    if (state.goals.length === 0) {
      scoreUp = true;
    }

    return new Promise((res, rej) => {
      axios
        .put(`http://localhost:8001/api/goals/${id}`, { goal, scoreUp })
        .then(x => {
          axios
            .get(`http://localhost:8001/api/goals/${user}`)
            .then(res2 => {
              dispatch({
                ...state,
                type: "SET_DATA",
                goals: res2.data
              });
              res(res2);

              axios
                .get(`http://localhost:8001/api/users/${user}`)
                .then(res2 => {
                  dispatch({
                    type: SET_USER,
                    users: res2.data
                  });
                  res(res2);
                });
            })
            .catch(error => {
              rej(error);
            });
        });
    });
  };

  const deleteGoal = id => {
    const user = localStorage.getItem("id");
    return new Promise((res, rej) => {
      axios
        .delete(`http://localhost:8001/api/goals/${id}`)
        .then(res1 => {
          axios.get(`http://localhost:8001/api/goals/${user}`).then(res2 => {

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
    <Grid className="goals-background-image" container spacing={1}>
      <Grid item xs={5}>
        <CardGoals
          state={state}
          setGoal={setGoal}
          GoalsInList={GoalsInList}
        ></CardGoals>
      </Grid>
      <Grid item xs={7}>
        <CardGoalsTips></CardGoalsTips>
      </Grid>
    </Grid>
  );
}

export default Goals;
