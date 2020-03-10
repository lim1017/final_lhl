export default function reducerz(state, action) {
  switch (action.type) {
    case SET_EXPENSE:
      return { ...state, expense: action.value };
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
export {
  SET_EXPENSE
};
