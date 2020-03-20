import React from "react";
import { PieChart, Pie, Legend, Cell } from "recharts";

function createPie(portfolioTypes) {
  console.log("dashboard", portfolioTypes);
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
  "#f6c1fd",
  "#fbe8fd",
  "#ffe7ea",
  "#c5e6ab",
  "#c4d2c7",
  "#d4f3bb"
];

function CardPortfolio(props) {
  return (
    <>
      <div>Your Investment Portfolio: </div>
      <div>
        {`Your expected return is ${props.state.users[0].portfolioreturn}`}{" "}
      </div>
      <PieChart width={730} height={500}>
        <Pie
          data={createPie(
            props.portfolioDistribution(props.state.users[0].riskscore)
              .investmentTypes
          )}
          dataKey="value"
          nameKey="name"
          cx="40%"
          cy="40%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {createPie(
            props.portfolioDistribution(props.state.users[0].riskscore)
              .investmentTypes
          ).map((entry, index) => (
            <Cell fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          layout="vertical"
          height={0}
          width={250}
        />
      </PieChart>
    </>
  );
}

export default CardPortfolio;
