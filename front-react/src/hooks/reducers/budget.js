const BASE = "BASE";
const INCOME = "INCOME";
const C_HOUS = "C_HOUS";
const C_TRAN = "C_TRAN";
const C_FOOD = "C_FOOD";
const C_UTIL = "C_UTIL";
const C_ENTR = "C_ENTR";
const C_MEDI = "C_MEDI";
const C_DEBT = "C_DEBT";
const C_MISC = "C_MISC";
const ALL = "ALL";

export default function budgetReducer(state, action) {
  switch (action.type) {
    case BASE:
      return {
        ...state,
        base: action.amount
      };
    case INCOME:
      return {
        ...state,
        income: action.amount
      };
    case C_HOUS:
      return {
        ...state,
        c_hous: action.amount
      };
    case C_TRAN:
      return {
        ...state,
        c_tran: action.amount
      };
    case C_FOOD:
      return {
        ...state,
        c_food: action.amount
      };
    case C_UTIL:
      return {
        ...state,
        c_util: action.amount
      };
    case C_ENTR:
      return {
        ...state,
        c_entr: action.amount
      };
    case C_MEDI:
      return {
        ...state,
        c_medi: action.amount
      };
    case C_DEBT:
      return {
        ...state,
        c_debt: action.amount
      };
    case C_MISC:
      return {
        ...state,
        c_misc: action.amount
      };
    case ALL:
      return {
        ...action.budget
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
