/* Import Global State/Hooks */ 
import React, { useContext, useReducer, useEffect } from "react";
import appDataContext from "../hooks/reducers/useContext";
import axios from "axios";
import budgetReducer from "../hooks/reducers/budget";
import budgetToggleReducer from "../hooks/reducers/budgetToggle";
import budgetGoalsReducer from "../hooks/reducers/budgetGoals";

/* Import Components */
import Card from "components/Card/Card.jsx";
import BudgetGraphCard from "components/Budget/BudgetGraphCard.jsx";
import { Grid, Row, Col } from "react-bootstrap";
import ChartistGraph from "react-chartist";
import {
  responsiveBar,
  responsiveSales
} from "variables/Variables.jsx";
import BudgetPlanner from "components/Budget/BudgetPlanner";
import BudgetGoals from "components/Budget/BudgetGoals";
import BudgetNavButtonA from "components/CustomButton/BudgetNavButton";
import { budgetCalc, budgetCalcPortfolio, budgetSetGraphData } from "helpers/budget";
import useWindowDimensions from "helpers/windowDimensions";
import MonthPicker from "components/MonthPicker/MonthPicker.jsx";

// Outer Functions


/* --------------- */
/* Budget Function */
/* --------------- */
function Budget(props) {

  // States & Variables
  const{ state, dispatch } = useContext(appDataContext);
  const [ budget, dispatchBudget ] = useReducer(budgetReducer, {
    id: 0,
    user_id: 0,
    default: 100000,
    income: 1000,
    c_hous: 10,
    c_tran: 20,
    c_food: 30,
    c_util: 40,
    c_entr: 50,
    c_medi: 60,
    c_debt: 70,
    c_misc: 80
  });
  const [ goal, dispatchGoal ] = useReducer(budgetGoalsReducer, {
    id: [],
    select: []
  });
  const [ toggle, dispatchToggle ] = useReducer(budgetToggleReducer, {
    planner: true,
    goal: false
  });
  const [range, setRange] = React.useState(12);
  const [portfolio, setPortfolio] = React.useState(1);
  const { height: winHeight, width: winWidth } = useWindowDimensions();

  // Inner Functions

  if (state) {
    for (const user of state.users) {
      if (user.id === 1 && user.portfolioreturn > 1 && user.portfolioreturn !== portfolio) {
        setPortfolio(user.portfolioreturn);
      }
    }
  }

  function chgMonth(date) {
    const dateA = {
      month: date.month,
      year: date.year
    };

    dispatch({
      type: "SET_DATE",
      date: dateA
    });

    refreshExpenses(date);
  }

  function refreshExpenses(date) {
    let datez = `${date.month}+${date.year}`;

    Promise.all([
      axios.get(`http://localhost:8001/api/expenses/${datez}`),
      axios.get(`http://localhost:8001/api/expensestotal/${datez}`)
    ])
      .then(response => {
        dispatch({
          type: "SET_DATA",
          expenses: response[0].data,
          totalExpenses: response[1].data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  function getActualExpenses(n) {
    return (state.totalExpenses[n] ? state.totalExpenses[n].sum : 0)
  }

  function setGraphDisplayRange(bud, goal, range, port) {
    const res = {
      yMin : parseInt(bud.default) || 0,
      yMax : (parseInt(bud.default) || 0) + budgetCalc(bud) * range
    }

    if (budgetCalc(bud) * range < 0) {
      res.yMin = (parseInt(bud.default) || 0) + budgetCalc(bud) * range;
      res.yMax = parseInt(bud.default) || 0;
    }

    for (const g of goal.select) {
      if (g.type === "SFP") {
        if (g.amount > res.yMax) res.yMax = g.amount;
        if (g.amount < res.yMin) res.yMin = g.amount;
      }
    }

    if (port > 1) {
      let portGain = budgetCalcPortfolio(budget.default, budget.income, port, range);
      if (portGain > res.yMax) res.yMax = portGain;
    }

    res.yMax *= 1.1;
    if (res.yMax < 10000) res.yMax = 10000;

    return res;
  }

  console.log('this is setGraphDisplayRange: ', setGraphDisplayRange(budget, goal, range).yMax, setGraphDisplayRange(budget, goal, range).yMin);

  // Render Contents
  return (
  <div>
    <div className="budgetNav">
      <div className="budgetNavA">
        <MonthPicker currentMonth={state.date} chgMonth={chgMonth} />
      </div>
      <div className="budgetButtons">
        <BudgetNavButtonA
          toggle={toggle.planner}
          dispatch={dispatchToggle}
          type={"PLANNER"}
          text={"Budget Planner"}
        />
        <BudgetNavButtonA
          toggle={toggle.goal}
          dispatch={dispatchToggle}
          type={"GOAL"}
          text={"Goals"}
        />
      </div>
    </div>
    <div className="content top100px">
      <Grid fluid>
        <Row>
          <Col lg={12}>
            {toggle.planner ?
            <BudgetPlanner
              budget={budget}
              updateBudgetLocal={dispatchBudget}
            />
            : null}
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            {toggle.goal ?
            <BudgetGoals
              goal={goal}
              selectGoal={dispatchGoal}
              goals={state.goals}
              budget={budget}
              updateBudgetLocal={dispatchBudget}
            />
            : null}
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <Card
              title="Plan vs Actual Total Expenses"
              category="compare planned expenses vs expenses in given month"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <ChartistGraph
                    data={{
                      labels: ['Plan', 'Month'],
                      series: [
                        [budget.c_hous, getActualExpenses(5)],
                        [budget.c_tran, getActualExpenses(4)],
                        [budget.c_food, getActualExpenses(6)],
                        [budget.c_util, getActualExpenses(7)],
                        [budget.c_entr, getActualExpenses(0)],
                        [budget.c_medi, getActualExpenses(1)],
                        [budget.c_debt, getActualExpenses(2)],
                        [budget.c_misc, getActualExpenses(3)],
                      ]
                    }}
                    targetLine= {{
                      value: 400,
                      class: 'ct-target-line'
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 5,
                      height: "240px",
                      stackBars: true
                    }}
                    responsiveOptions={responsiveBar}
                    // listener={{
                    //   draw: e => onDrawHandler(e)
                    // }}

                    listener={{"draw" : function(data) { if(data.type === 'bar') {
                      data.element.animate({
                        y2: {
                            begin: 0,
                            dur: 500,
                            from: data.y1,
                            to: data.y2
                            // easing: Chartist.Svg.Easing.easeOutSine,
                        }});
                      }}}}/>


                  />
                </div>
              }
            />
          </Col>
          <Col lg={8}>
            <Card
              title="Plan vs Actual Expenses by Category"
              category="compare planned expenses vs expenses in given month"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <ChartistGraph
                    data={{
                      labels: ['Housing', 'Transportation', 'Food', 'Utility', 'Entertainment', 'Medical', 'Debt', 'Misc'],
                      series: [
                        [budget.c_hous, budget.c_tran, budget.c_food, budget.c_util, budget.c_entr, budget.c_medi, budget.c_debt, budget.c_misc],
                        [
                          getActualExpenses(5),
                          getActualExpenses(4),
                          getActualExpenses(6),
                          getActualExpenses(7),
                          getActualExpenses(0),
                          getActualExpenses(1),
                          getActualExpenses(2),
                          getActualExpenses(3)
                        ]
                      ]
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      height: "240px",
                      stackBars: false
                    }}
                    responsiveOptions={responsiveBar}
                    // listener={{
                    //   draw: e => onDrawHandler(e)
                    // }}
                    
                    listener={{"draw" : function(data) { if(data.type === 'bar') {
                      data.element.animate({
                        y2: {
                            begin: 0,
                            dur: 500,
                            from: data.y1,
                            to: data.y2
                            // easing: Chartist.Svg.Easing.easeOutSine,
                        }});
                      }}}}/>

                    


                  />
                </div>
              }
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <BudgetGraphCard
              title="Budget Plan summary"
              category="insert other budget informations here"
              ctTableFullWidth
              ctTableResponsive
              range={range}
              setRange={setRange}
              content={
                <div>
                  <ChartistGraph
                    data={
                      budgetSetGraphData(budget, range, portfolio)
                    }
                    // targetLine={{
                    //   value: 400,
                    //   class: 'ct-target-line'
                    // }}
                    type="Line"
                    options={{
                      low: setGraphDisplayRange(budget, goal, range, portfolio).yMin || 0,
                      high: setGraphDisplayRange(budget, goal, range, portfolio).yMax || 0,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: true
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        left: 50,
                        right: 50
                      }
                    }}
                    responsiveOptions={responsiveSales}
                    listener={{
                      draw: data => {
                        if(data.type === 'label') {
                          if (data.text < 10) {
                            data.element.attr({
                              x: data.x - (winWidth / 300)
                            });
                          } else if (data.text < 100) {
                            data.element.attr({
                              x: data.x - (winWidth / 150)
                            });
                          } else {
                            data.element.attr({
                              x: data.x - (winWidth / 80)
                            });
                          }
                        }
                      },
                      created: context => {

                        for (const g of goal.select) {
                          const currentDate = new Date();
                          const goalYear = g.date.split('-')[2];
                          const goalMonthText = g.date.split('-')[1];
                          let goalMonth = 0;
                          let totalMonth = 0;
                          
                          if (goalMonthText) {
                            if (goalMonthText === "JAN") goalMonth = 1;
                            if (goalMonthText === "FEB") goalMonth = 2;
                            if (goalMonthText === "MAR") goalMonth = 3;
                            if (goalMonthText === "APR") goalMonth = 4;
                            if (goalMonthText === "MAY") goalMonth = 5;
                            if (goalMonthText === "JUN") goalMonth = 6;
                            if (goalMonthText === "JUL") goalMonth = 7;
                            if (goalMonthText === "AUG") goalMonth = 8;
                            if (goalMonthText === "SEP") goalMonth = 9;
                            if (goalMonthText === "OCT") goalMonth = 10;
                            if (goalMonthText === "NOV") goalMonth = 11;
                            if (goalMonthText === "DEC") goalMonth = 12;
                          }
                          
                          totalMonth = (goalYear - currentDate.getFullYear()) * 12 + goalMonth - (currentDate.getMonth() + 1)
                          if (context.axisX.ticks.length > 12) totalMonth = totalMonth / 3;
                          console.log(totalMonth, goalMonthText, (currentDate.getMonth() + 1));

                          if (g.type === "SFP") {

                            function projectY(chartRect, bounds, value) {
                              return chartRect.y1 - 
                                (chartRect.height() * (value - bounds.min) / (bounds.range/* + bounds.step*/));
                            }
                            function projectX(chartRect, axisX, value) {
                              return chartRect.x1 + (axisX.stepLength * value);
                            }

                            let targetLineY1 = projectY(context.chartRect, context.bounds, g.amount);
                            let targetLineY2 = projectY(context.chartRect, context.bounds, g.amount);
                            let targetLineX = projectX(context.chartRect, context.axisX, totalMonth);

                            context.svg.elem('line', {
                              x1: context.chartRect.x1,
                              x2: context.chartRect.x2,
                              y1: targetLineY1,
                              y2: targetLineY2
                            }, 'ct-target-line');

                            console.log(totalMonth)
                            
                            if (totalMonth > 0 && totalMonth <= context.axisX.ticks.length) {
                              context.svg.elem('line', {
                                x1: targetLineX,
                                x2: targetLineX,
                                y1: context.chartRect.y1,
                                y2: context.chartRect.y2
                              }, 'ct-target-line');
                            }

                          }
                        }

                      }
                    }}
                    listener={{"draw" : function(data) {
                      if(data.type === 'line' || data.type === 'area') {
                        data.element.animate({
                          d: {
                            begin: 2000 * data.index,
                            dur: 1000,
                            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                            to: data.path.clone().stringify()
                            // easing: Chartist.Svg.Easing.easeOutQuint
                          }
                        });
                      } } }}/>
                    
                  />
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
  );
}

export default Budget;
