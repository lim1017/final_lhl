const budgetCalc = function(budget) {
  let result = parseInt(0);

  if (budget.income) result += budget.income

  if (budget.c_hous) result -= budget.c_hous
  if (budget.c_tran) result -= budget.c_tran
  if (budget.c_food) result -= budget.c_food
  if (budget.c_util) result -= budget.c_util
  if (budget.c_entr) result -= budget.c_entr
  if (budget.c_medi) result -= budget.c_medi
  if (budget.c_debt) result -= budget.c_debt
  if (budget.c_misc) result -= budget.c_misc

  return  result;
};

const budgetSetGraphData = function(budget, range) {
  let result = {
    labels: [],
    series: [
      []
    ]
  }

  let monthlyGain = budgetCalc(budget);
  let currentDate = new Date();
  let base = budget.default || 0;

  if (range === null || range >= 12) {
    let searchRange = 12;
    for (let month = 0; month < searchRange; month++) {
      let node = currentDate.getMonth()+month+1;
      if (node > 12) node -= 12;
      result.labels.push(node);
      let number = parseInt(base) + monthlyGain * month;
      result.series[0].push(parseInt(number));
    }
  }

  return result;
};

module.exports = { budgetCalc, budgetSetGraphData };