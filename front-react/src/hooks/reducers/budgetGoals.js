const SELECT = "SELECT";

export default function budgetGoals(state, action) {
  switch (action.type) {
    case SELECT:
      // allow multiple goals selection
      // const id = state.id;
      // const select = state.select;

      //only allow one goal at given time
      let id = state.id;
      let select = state.select;

      if (!id.includes(action.id)) {
      //only allow one goal at given time
        id = [];
        select = [];

        id.push(action.id)
        select.push(action.goal)
      } else {
        for (let i = 0; i < select.length; i++) {
          if (select[i].id === action.id) {
            select.splice(i, 1);
          }
        }
        for (let i = 0; i < id.length; i++) {
          if (id[i] === action.id) {
            id.splice(i, 1);
          }
        }
      }

      return {
        id: id.sort((a, b) => (a.id > b.id) ? 1 : -1),
        select: select.sort((a, b) => (a.id > b.id) ? 1 : -1),
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
