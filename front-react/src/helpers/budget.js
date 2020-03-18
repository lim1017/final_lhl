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

const budgetCalcPortfolio = function(def, inc, port, period) {

  // let result = def;
  // for (let i = 0; i < period; i++) {
  //   result += inc + result * (port - 1);
  // }
  const rate = port - 1;
  const defaultInterest = def * Math.pow((1 + (rate / 12)), period);
  const incomeInterest = inc*12*((Math.pow((1+rate/period), (rate*period))-1)/(rate/period));
  const result = defaultInterest + incomeInterest;

  return result;
}

const budgetSetGraphData = function(budget, range, port) {
  let result = {
    labels: [],
    series: [ [], [] ]
  }

  let monthlyGain = budgetCalc(budget);
  let currentDate = new Date();
  let base = budget.default || 0;
  let searchRange = range || 12;
  let portCheck = (port > 1)

  for (let month = 0; month < searchRange; month++) {
    let node = (currentDate.getMonth()+month) % 12 + 1;
    let yearNode = currentDate.getFullYear() + Math.floor(month / 12);
    let number = parseInt(base) + monthlyGain * month;
    
    if (range <= 12) {
      result.labels.push(node);       
      result.series[0].push(parseInt(number));
      if (portCheck) result.series[1].push(budgetCalcPortfolio(parseInt(base), monthlyGain, port, month));
    } else if (range <= 60) {
      if (node % 3 === 1) {
        if (node === 1) {
          result.labels.push(yearNode);
          result.series[0].push(parseInt(number));
          if (portCheck) result.series[1].push(budgetCalcPortfolio(parseInt(base), monthlyGain, port, month));
        } else {
          result.labels.push(node);
          result.series[0].push(parseInt(number));
          if (portCheck) result.series[1].push(budgetCalcPortfolio(parseInt(base), monthlyGain, port, month));
        }
      }
    } else if (range <= 120) {
      if (node % 12 === 1) {
        result.labels.push(yearNode);
        result.series[0].push(parseInt(number));
        if (portCheck) result.series[1].push(budgetCalcPortfolio(parseInt(base), monthlyGain, port, month));
      } else if (node % 3 === 1) {
        result.labels.push("");
        result.series[0].push(parseInt(number));
        if (portCheck) result.series[1].push(budgetCalcPortfolio(parseInt(base), monthlyGain, port, month));
      }
    }
  }

  return result;
};

module.exports = { budgetCalc, budgetCalcPortfolio, budgetSetGraphData };