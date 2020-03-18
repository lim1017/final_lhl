import React, { useReducer, useEffect } from "react";
import axios from "axios";
import reducerz, { SET_DATA } from "./reducers/app";

export default function useAppData() {
  const [state, dispatch] = useReducer(reducerz, {
    expenses: [{id: 0, name: '', user_id: 0, amount: 0, type: '', date: ''}],
    totalExpenses:[{type:'', sum:0},{type:'', sum:0},{type:'', sum:0}],
    budget: [{id: 0, user_id: 0, income: 0, c_hous: 0, c_tran: 0, c_food: 0, c_util: 0, c_entr: 0, c_medi: 0, c_debt: 0, c_misc: 0}],
    goals: [],
    users: [{a: 'a', riskScore: 0, portfolioReturn: 0}],
    date: {month: 1, year: 2020},
    educationAnswers:{1:0, 2:0, 3:0, 4:0, 5:0},
    educationAnsweredYet:{1:false, 2:false, 3:false, 4:false, 5:false},
    eduProgress:0
  });



  useEffect(() => {

    let datez= `${state.date.month}+${state.date.year}`

      Promise.all([
        axios.get(`http://localhost:8001/api/expenses/${datez}`),
        axios.get(`http://localhost:8001/api/expensestotal/${datez}`),
        axios.get("http://localhost:8001/api/budget"),
        axios.get("http://localhost:8001/api/goals"),
        axios.get("http://localhost:8001/api/users")

      ]).then(response => {
        dispatch({
          type: SET_DATA,
          expenses: response[0].data,
          totalExpenses: response[1].data,
          budget: response[2].data,
          goals: response[3].data,
          users: response[4].data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  const setGoal = (id, goal) => {
    return new Promise((res, rej) => {
     
      axios
        .put(`http://localhost:8001/api/goals/${id}`, goal)
        .then(res1 => {
          axios.get("http://localhost:8001/api/goals").then(res2 => {
            dispatch({
              type: SET_DATA,
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
              type: SET_DATA,
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

  useEffect(() => {
    console.log("state has been updated: ", state);
  }, state);

  return { state, dispatch };
}
