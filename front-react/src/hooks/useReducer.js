import React, { useReducer, useEffect } from "react";

import reducerz, {
  SET_EXPENSE

} from "reducer/reducer";

export default function useReducer() {
 
  const [state, dispatch] = useReducer(reducerz, {
    expenses:[]
  });

}