const SELECT = "SELECT";

export default function budgetGoals(state, action) {
  switch (action.type) {
    case SELECT:
      const newState = state.select;

      if (!newState.includes(action.id)) {
        newState.push(action.id)
      } else {
        for (let i = 0; i < newState.length; i++) {
          if (newState[i] === action.id) {
            newState.splice(i, 1);
          }
        }
      }

      return {
        select: newState.sort()
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
