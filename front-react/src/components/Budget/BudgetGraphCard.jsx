import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Scatter } from "recharts";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export const BudgetGraphCard = function(props) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    props.setRange(event.target.value);
  };

  const setCategoryMessage = function(goalCheck) {
    const sc = { aCheck: -1, ax: "", iCheck: -1, ix: "", dCheck: -1, dx: "" };
    let typeCheck = true;

    for (const g of goalCheck) {
      if (g.goal.type === "SFP") {
        if (g.type === "AWOI" && g.x !== "") {
          sc.aCheck = g.month;
          sc.ax = g.x;
        }
        if (g.type === "AAWI" && g.x !== "") {
          sc.iCheck = g.month;
          sc.ix = g.x;
        }
        if (g.type === "DATE" && g.x !== "") {
          sc.dCheck = g.month;
          sc.dx = g.x;
        }
      } else typeCheck = false;
    }


    if (props.budgetCalc <= 0) {
      return (
        <div className="category">
           <p>
            Please save a positive amount in order to invest.
            </p>
        </div>
      )
    } else if (typeCheck && goalCheck.length !== 0 && !props.info.botg) {
      return (
        <div className="category">
            <p className='power-of-investing-text3'>
              <strong> Investment Growth Rate: <u>{props.portfolioR}</u>%  </strong>.
            </p>
          {(sc.aCheck > sc.dCheck || sc.aCheck === -1) && (sc.iCheck > sc.dCheck || sc.iCheck === -1) ? (
            <p>
              Your goal cannot be met by <span className="redText">deadline</span>{" "}
              of {`${sc.dx.split(" ")[1]} ${sc.dx.split(" ")[2]}`}.
            </p>
          ) : null}
          {0 < sc.aCheck && sc.aCheck < sc.dCheck || 0 < sc.iCheck && sc.iCheck < sc.dCheck ? (
            <p className='power-of-investing-text'>
              Your goal can be met by <span className="redText">deadline</span> of{" "}
              {`${sc.dx.split(" ")[1]} ${sc.dx.split(" ")[2]}`}.
            </p>
          ) : null}
          {sc.iCheck >= 0 && sc.iCheck < 600 ? (
            <p className='power-of-investing-text'>
              Your goal can be met by <span className="blueText">investing</span> by{" "}
              {`${sc.ix.split(" ")[1]} ${sc.ix.split(" ")[2]}`}.
            </p>
          ) : null}
          {sc.aCheck >= 0 && sc.aCheck < 600 ? (
            <p className='power-of-investing-text2'> 
              Your goal can be met{" "}
              <span className="greenText">with no investing</span> by{" "}
              {`${sc.ax.split(" ")[1]} ${sc.ax.split(" ")[2]}`}.
            </p>
          ) : null}
          {sc.aCheck === -1 && sc.iCheck === -1 ? (
            <p>
              Your goal cannot be met within 50 years.
            </p>
          ) : null}
        </div>
      );
    }
  };

  return (
    <div
      className={
        "cardBudget budgetGraphCardGrid" +
        (props.plain ? " card-plain" : "") +
        (props.size ? ` cardBudgetSize${props.size}` : "")
      }
    >
      <div
        className={"budgetGraphHeader" + (props.hCenter ? " text-center" : "")}
      >
        <h4 className="title">{props.title}</h4>
        {setCategoryMessage(props.goalTrack)}
        <div className="budgetIcons">
          <div className="budgetIconsList">
            <div className="iconQuestion">
              <img
                src={require("../../assets/img/budget_question2.png")}
                alt="question"
                height="20"
                width="20"
                onClick={() => {
                  props.dispatchInfo({ type: props.dispatchType });
                }}
              />
            </div>
            <div className="iconQuit">
              <img
                src={require("../../assets/img/budget_quit4.png")}
                alt="quit"
                height="20"
                width="20"
                onClick={() => props.dispatch({ type: props.dispatchType })}
              />
            </div>
          </div>
        </div>
        <div className="textAlignRight">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Range
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={props.range}
              onChange={handleChange}
              labelWidth={labelWidth}
            >
              <MenuItem value={12}>1 Year</MenuItem>
              <MenuItem value={60}>5 Years</MenuItem>
              <MenuItem value={120}>10 Years</MenuItem>
              <MenuItem value={180}>15 Years</MenuItem>
              <MenuItem value={240}>20 Years</MenuItem>
              <MenuItem value={600}>50 Years</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className={"content budgetGraphCardGraph"}>
        {props.content}

        <div className="footer">
          {props.legend}
          {props.stats != null ? <hr /> : ""}
          <div className="stats">
            <i className={props.statsIcon} /> {props.stats}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetGraphCard;
