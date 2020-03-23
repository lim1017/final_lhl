const monthName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const budgetCalc = function(budget) {
  let result = parseInt(0);

  if (budget.income) result += parseInt(budget.income)

  if (budget.c_hous) result -= parseInt(budget.c_hous)
  if (budget.c_tran) result -= parseInt(budget.c_tran)
  if (budget.c_food) result -= parseInt(budget.c_food)
  if (budget.c_util) result -= parseInt(budget.c_util)
  if (budget.c_entr) result -= parseInt(budget.c_entr)
  if (budget.c_medi) result -= parseInt(budget.c_medi)
  if (budget.c_debt) result -= parseInt(budget.c_debt)
  if (budget.c_misc) result -= parseInt(budget.c_misc)

  return result;
};

const expensesCalc = function(expenses) {
  let result = parseInt(0);

  for (const expense of expenses) {
    result += parseInt(expense.sum)
  }

  return result;
}

const budgetCalcPortfolio = function(def, inc, port, period) {

  const monthly = Math.pow((port), (1/12))
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
}

const budgetSetGraphData = function(budget, range, port) {
  let result = {
    labels: [],
    series: [ [], [] ]
  }
  let data = []

  let monthlyGain = budgetCalc(budget);
  let currentDate = new Date();
  let base = budget.base || 0;
  let searchRange = range || 12;
  let portCheck = (port > 1)

  for (let month = 0; month < searchRange; month++) {
    let node = (currentDate.getMonth()+month) % 12;
    let yearNode = currentDate.getFullYear() + Math.floor(month / 12);
    let number = Math.floor(parseInt(base) + monthlyGain * month);
    const dataNode = {};
    
    dataNode.name = `${monthName[node]} / ${yearNode}`;
    dataNode.saving = parseInt(number);
    if (portCheck) dataNode.portfolio = budgetCalcPortfolio(parseInt(base), monthlyGain, port, month) - parseInt(number);
    data.push(dataNode);
  }

  return data;
};
 
const findUserBudget = function(state, id) {
  let result = {
    id: 0,
    user_id: 0,
    base: 0,
    income: 0,
    c_hous: 0,
    c_tran: 0,
    c_food: 0,
    c_util: 0,
    c_entr: 0,
    c_medi: 0,
    c_debt: 0,
    c_misc: 0
  };

  if (state.budget) {
    for (const budget of state.budget) {
      if (budget.user_id && budget.user_id === parseInt(id)) {
        result = budget;
      }
    }
  }

  return result;
}

module.exports = { budgetCalc, budgetCalcPortfolio, budgetSetGraphData, findUserBudget, expensesCalc };
