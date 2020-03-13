
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Goal from "components/Goal/index.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import useAppData from "../hooks/useAppData";

function Goals(props) {
  const{
    state,
    setGoal,
    deleteGoal
  } = useAppData();

  const GoalsInList = state.goals.map(goal => {
    return (
      <Goal
        key={goal.id}
        id={goal.id}
        name={goal.name}
        category="Here is a subtitle for this table"
        type={goal.type}
        amount={goal.amount}
        description={goal.description}
        date={goal.date}
        setGoal={setGoal}
        deleteGoal={deleteGoal}
      />
    );
  });

  return (
    <div className="content">
      <p>Goals</p>
                    
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Goals"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    {GoalsInList}
                    <Goal
                      mode="new"
                      key={state.goals.length + 1}
                      id={state.goals.length + 1}
                      category="Here is a subtitle for this table"
                      date={`2020-01-05T05:00:00.000Z`}
                      setGoal={setGoal}
                    />
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      <StatsCard />
    </div>
  );

}

export default Goals;
