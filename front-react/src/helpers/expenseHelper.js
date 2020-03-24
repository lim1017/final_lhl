const createPie = function(expensesTotal) {
  const finalOP = [];
  expensesTotal.forEach(element => {
    const slice = {
      name: element.type,
      value: parseInt(element.sum)
    };
    finalOP.push(slice);
  });
  return finalOP;
};

const returnMonthText = function(number) {
  switch (number) {
    case 1:
      return "January";
    case 2:
      return "Febuary";
    case 3:
      return "March";

    default:
    // code block
  }
};

const formatDataForExpenseTable = function(data) {
  const finalOP = [];

  data.forEach(ele => {
    if (ele.amount !== 0) {
      finalOP.push(ele);
    }
  });

  return finalOP;
};

const formatDataForBarChart = function(data) {
  const finalOP = [];
  const avg = [315, 180, 533, 1700, 79, 172, 558, 300];
  const avg2 = {Debt:315, Entertainment:180, Food:533, Home:1700, Medical:79, Misc:172, Transportation:458, Utilities:320};
  
  let i = 0;
  data.forEach(ele => {
    const bar = {
      name: ele.type,
      Personal: ele.sum,
      Average: avg2[ele.type]
    };
    finalOP.push(bar);
    i++;
  });

  

  return finalOP;
};

module.exports = {
  formatDataForExpenseTable,
  createPie,
  returnMonthText,
  formatDataForBarChart
};
