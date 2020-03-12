const SET_DATA = "SET_DATA";

export {
  SET_DATA
};

export default function reducerz(state, action) {
  switch (action.type) {
    case SET_DATA:
      console.log('running SET_DATA: ', action)
      return {
        ...state,
        expenses: action.expenses,
        totalExpenses: action.totalExpenses,
        budget: action.budget,
        goals: action.goals
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
