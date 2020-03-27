const monthName = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

const budgetCalc = function(budget) {
  let result = parseInt(0);

  if (budget.income) result += parseInt(budget.income);

  if (budget.c_hous) result -= parseInt(budget.c_hous);
  if (budget.c_tran) result -= parseInt(budget.c_tran);
  if (budget.c_food) result -= parseInt(budget.c_food);
  if (budget.c_util) result -= parseInt(budget.c_util);
  if (budget.c_entr) result -= parseInt(budget.c_entr);
  if (budget.c_medi) result -= parseInt(budget.c_medi);
  if (budget.c_debt) result -= parseInt(budget.c_debt);
  if (budget.c_misc) result -= parseInt(budget.c_misc);

  return result;
};

const expensesCalc = function(expenses) {
  let result = parseInt(0);

  for (const expense of expenses) {
    result += parseInt(expense.sum);
  }

  return result;
};

const budgetCalcPortfolio = function(def, inc, port, period) {
  const monthly = Math.pow(port, 1 / 12);
  let start = def;
  let end = 0;
  for (let i = 0; i <= period; i++) {
    if (i === 0) end = start;
    else {
      end = start * monthly + inc;
      start = end;
    }
  }

  return Math.floor(end);
};

const budgetSetGraphData = function(budget, range, port, goal) {
  let data = [];
  let goalCheck = [];
  for (const g of goal) {
    goalCheck.push({goal: g, type: 'AWOI', x: '', checked: false, month: 0});
    goalCheck.push({goal: g, type: 'AAWI', x: '', checked: false, month: 0});
    goalCheck.push({goal: g, type: 'DATE', x: '', checked: false, month: 0});
  }

  let monthlyGain = budgetCalc(budget);
  let currentDate = new Date();
  let base = budget.base || 0;
  let searchRange = range || 12;
  let portCheck = port > 1;

  for (let month = 0; month <= 600; month++) {
    let node = (currentDate.getMonth() + month) % 12;
    let yearNode = currentDate.getFullYear() + Math.floor(month / 12);
    let number = Math.floor(parseInt(base) + monthlyGain * month);
    const dataNode = {};

    if (month <= searchRange) {
      dataNode.name = `${month} ${monthName[node]} ${yearNode}`;
      dataNode["Assets without Investing"] = parseInt(number);
      if (portCheck)
        dataNode["Additional Assets with Investing"] =
          budgetCalcPortfolio(parseInt(base), monthlyGain, port, month) -
          parseInt(number);
      data.push(dataNode);
    }

    for (const gc of goalCheck) {
      if (gc.goal.type === "SFP" && gc.goal.amount < parseInt(number)) {
        if (gc.type === 'AWOI' && gc.checked === false) {
          gc.x = `${month} ${monthName[node]} ${yearNode}`;
          gc.month = month;
          gc.checked = true;
        }
      }
      if (
        gc.goal.type === "SFP" &&
        gc.goal.amount < budgetCalcPortfolio(parseInt(base), monthlyGain, port, month)
      ) {
        if (gc.type === 'AAWI' && gc.checked === false) {
          gc.x = `${month} ${monthName[node]} ${yearNode}`;
          gc.month = month;
          gc.checked = true;
        }
      }
      if (
        gc.type === "DATE" &&
        gc.goal.date.split("-")[1] === monthName[node] &&
        parseInt(gc.goal.date.split("-")[2]) === yearNode &&
        gc.checked === false
      ) {
        gc.x = `${month} ${monthName[node]} ${yearNode}`;
        gc.month = month;
        gc.checked = true;
      }
    }
  }

  return {data, goalCheck};
};

const findUserBudget = function(state, id) {
  let result = {
    id: 0,
    user_id: 0,
    base: 0,
    income: 0,
    c_hous: state.totalExpenses[3] ? state.totalExpenses[3].sum : 0,
    c_tran: state.totalExpenses[6] ? state.totalExpenses[6].sum : 0,
    c_food: state.totalExpenses[5] ? state.totalExpenses[5].sum : 0,
    c_util: state.totalExpenses[0] ? state.totalExpenses[0].sum : 0,
    c_entr: state.totalExpenses[1] ? state.totalExpenses[1].sum : 0,
    c_medi: state.totalExpenses[2] ? state.totalExpenses[2].sum : 0,
    c_debt: state.totalExpenses[7] ? state.totalExpenses[7].sum : 0,
    c_misc: state.totalExpenses[4] ? state.totalExpenses[4].sum : 0
  };

  if (state.budget) {
    for (const budget of state.budget) {
      if (budget.user_id && budget.user_id === parseInt(id)) {
        result = budget;
      }
    }
  }

  return result;
};

module.exports = {
  budgetCalc,
  budgetCalcPortfolio,
  budgetSetGraphData,
  findUserBudget,
  expensesCalc
};
