import React, { useReducer, useEffect } from "react";
import axios from "axios";
import reducerz, {
  SET_DATA
} from "./reducers/app";

export default function useAppData() {
 
  const [state, dispatch] = useReducer(reducerz, {
    expenses: [{id: 0, name: '', user_id: 0, amount: 0, type: '', date: ''}],
    totalExpenses:[{type:'', sum:0}],
    budget: [{id: 0, user_id: 0, income: 0, c_hous: 0, c_tran: 0, c_food: 0, c_util: 0, c_entr: 0, c_medi: 0, c_debt: 0, c_misc: 0}],
    goals: [{id:0, name: '', type: '', amount: 0, description: 0, date: ''}],
    users: [{a: 'a'}]
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/expenses"),
      axios.get("http://localhost:8001/api/expensestotal"),
      axios.get("http://localhost:8001/api/budget"),
      axios.get("http://localhost:8001/api/goals")
    ]).then(response => {
      console.log('axios data recieved: ', response)
      dispatch({
        type: SET_DATA,
        expenses: response[0].data,
        totalExpenses: response[1].data,
        budget: response[2].data,
        goals: response[3].data
      })
    }).catch(error => {
      console.log(error);
    })
  }, []);

  useEffect(() => {
    console.log('state has been updated: ', state);
  }, state);

  return { state };
}