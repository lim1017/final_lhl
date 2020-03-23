const monthName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const getMonthNum = function(month) {
  for (let i = 0; i < monthName.length; i++) {
    if (month === monthName[i]) return i + 1;
  }
  return 1;
}

module.exports = { getMonthNum };
