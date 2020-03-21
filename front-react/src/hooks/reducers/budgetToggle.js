const PLANNER = "PLANNER";
const GOAL = "GOAL";
const PVAT = "PVAT";
const PVAC = "PVAC";
const PVAS = "PVAS";
const BOTG = "BOTG";

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
    case PVAT:
      return {
        ...state,
        pvat: !state.pvat
      };
    case PVAC:
      return {
        ...state,
        pvac: !state.pvac
      };
    case PVAS:
      return {
        ...state,
        pvas: !state.pvas
      };
    case BOTG:
      return {
        ...state,
        botg: !state.botg
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
