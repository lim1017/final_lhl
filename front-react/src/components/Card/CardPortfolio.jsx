import React from "react";
import { PieChart, Pie, Legend, Cell, Tooltip } from "recharts";

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

function CardPortfolio(props) {
  return (
    <>
      <div>My Investment Portfolio: </div>
      <div>
        {`My expected return is ${props.state.users[0].portfolioreturn}`}{" "}
      </div>
      <PieChart width={730} height={500}>
        <Tooltip
          itemStyle={{ color: "#e7e7e7" }}
          contentStyle={{ backgroundColor: "#272727" }}
        />

        <Pie
          data={createPie(
            props.portfolioDistribution(props.state.users[0].riskscore)
              .investmentTypes
          )}
          dataKey="value"
          nameKey="name"
          cx="40%"
          cy="45%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {createPie(
            props.portfolioDistribution(props.state.users[0].riskscore)
              .investmentTypes
          ).map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
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
