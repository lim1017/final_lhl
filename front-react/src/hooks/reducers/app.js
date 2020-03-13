const SET_DATA = "SET_DATA";
const SET_DATE = "SET_DATE";



export default function reducerz(state, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        expenses: action.expenses,
        totalExpenses: action.totalExpenses,
        budget: action.budget,
        goals: action.goals,
        users: action.users
      };
    case SET_DATE:
      console.log(action, 'actionzz')
      return {
        ...state,
        date: action.date
      };  
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {
  SET_DATA,
  SET_DATE
};
