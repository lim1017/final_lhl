import React from "react";
import { PieChart, Pie, Legend, Cell, Tooltip } from "recharts";

function portfolioDistribution(riskScore) {
  //renders portfolio based on questionnaire response of user
  let portfolioReturn = 1;
  // score will be from 5 - 20
  let investmentTypes = [
    { type: "Emerging Market Index", sum: 0 },
    { type: "S&P/TSX Index", sum: 0 },
    { type: "Low Volatility Index", sum: 0 },
    { type: "Corporate Bonds", sum: 0 },
    { type: "Government Bonds", sum: 0 },
    { type: "Cash", sum: 100 }
  ];
  //conservative portfolio
  if (riskScore < 8) {
    investmentTypes = [
      { type: "Emerging Market Index", sum: 5 },
      { type: "S&P/TSX Index", sum: 10 },
      { type: "Low Volatility Index", sum: 20 },
      { type: "Corporate Bonds", sum: 30 },
      { type: "Government Bonds", sum: 35 }
    ];
    portfolioReturn = 1.05;
  }
  // low risk portfolio
  else if (riskScore >= 8 && riskScore < 11) {
    investmentTypes = [
      { type: "Emerging Market Index", sum: 10 },
      { type: "S&P/TSX Index", sum: 15 },
      { type: "Low Volatility Index", sum: 25 },
      { type: "Corporate Bonds", sum: 25 },
      { type: "Government Bonds", sum: 25 }
    ];
    portfolioReturn = 1.06;
  }
  // medium risk portfolio
  else if (riskScore >= 11 && riskScore < 14) {
    investmentTypes = [
      { type: "Emerging Market Index", sum: 10 },
      { type: "S&P/TSX Index", sum: 25 },
      { type: "Low Volatility Index", sum: 25 },
      { type: "Corporate Bonds", sum: 20 },
      { type: "Government Bonds", sum: 20 }
    ];
    portfolioReturn = 1.07;
  }
  // strong risk portfolio
  else if (riskScore >= 14 && riskScore < 17) {
    investmentTypes = [
      { type: "Emerging Market Index", sum: 15 },
      { type: "S&P/TSX Index", sum: 35 },
      { type: "Low Volatility Index", sum: 20 },
      { type: "Corporate Bonds", sum: 15 },
      { type: "Government Bonds", sum: 15 }
    ];
    portfolioReturn = 1.08;
  }
  // maximum risk portfolio
  else if (riskScore >= 17) {
    investmentTypes = [
      { type: "Emerging Market Index", sum: 20 },
      { type: "S&P/TSX Index", sum: 40 },
      { type: "Low Volatility Index", sum: 25 },
      { type: "Corporate Bonds", sum: 10 },
      { type: "Government Bonds", sum: 5 }
    ];
    portfolioReturn = 1.09;
  }
  return { investmentTypes, portfolioReturn };
}

function createPie(portfolioTypes) {
  const finalOP = [];
  portfolioTypes.forEach(element => {
    const slice = {
      name: element.type,
      value: parseInt(element.sum)
    };
    finalOP.push(slice);
  });
  return finalOP;
}

const colors = [
  "#ffe7ea",
  "#fffbcf",
  "#dbf0ff",
  "#D0FFDE",
  "#e5dbff",
  "#FAEEC5",
  "#defafa",
  "#dffbd4"
];

function BriefPortfolio(props) {
  return (
    <div className="dashboard-chart4">
      {/* <h4>My Investment Portfolio: </h4> */}
      <h4>
        {`My Expected Portfolio Return is: ${props.state.users[0].portfolioreturn}`}{" "}
      </h4>

      <PieChart width={550} height={350}>
      <Tooltip itemStyle={{ color: '#e7e7e7' }}
                contentStyle={{ backgroundColor: "#272727" }} />

        <Pie
          data={createPie(
            portfolioDistribution(props.state.users[0].riskscore)
              .investmentTypes
          )}
          dataKey="value"
          nameKey="name"
          cx="41%"
          cy="52%"
          outerRadius={130}
          fill="#8884d8"
          label
        >
          {createPie(
            portfolioDistribution(props.state.users[0].riskscore)
              .investmentTypes
          ).map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          layout="horizontal"
          height={5}
          width={450}
        />
      </PieChart>
    </div>
  );
}

export default BriefPortfolio;
