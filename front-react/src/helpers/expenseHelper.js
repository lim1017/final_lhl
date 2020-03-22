const createPie=function (expensesTotal) {
   
  const finalOP=[]
  expensesTotal.forEach(element =>{
    const slice={
      name:element.type,
      value:parseInt(element.sum)
    }
    finalOP.push(slice)
  })
  return finalOP
}


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
  }

module.exports = { createPie, returnMonthText };

