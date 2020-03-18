const PLANNER = "PLANNER";
const GOAL = "GOAL";

export default function budgetReducer(state, action) {
  switch (action.type) {
    case PLANNER:
      return {
        ...state,
        planner: !state.planner
      };
    case GOAL:
      return {
        ...state,
        goal: !state.goal
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
