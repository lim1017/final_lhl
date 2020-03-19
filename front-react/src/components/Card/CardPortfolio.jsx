import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

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

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px"
};

const cardStyles = {
  width: "550px",
  border: "1px solid #b3898e",
  borderRadius: "5px",
  position: "relative",
  background: "white",
  opacity: "0.9"
};

const colors = [
  "#c4d2c7",
  "#ffe7ea",
  "#f87f8d",
  "#8a708d",
  "#d0fdab",
  "435a30"
];

function CardPortfolio(props) {
  return (
    // title="Portfolio Distribution"
    // content={
    //   <div
    //     id="chartPreferences"
    //     className="ct-chart ct-perfect-fourth"
    //   >
    //     {`Your expected return is ${props.state.users[0].portfolioreturn}
    // `}
    <PieChart width={730} height={350}>
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
        layout="horizontal"
        height={35}
        width={355}
      />
    </PieChart>
    // </div>
    // }
  );
}

export default CardPortfolio;
