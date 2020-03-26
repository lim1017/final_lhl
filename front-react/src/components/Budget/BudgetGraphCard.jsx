
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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
    const sc = {aCheck: -1, ax: "", iCheck: -1, ix: "", dCheck: -1, dx: "" }

    for (const g of goalCheck) {
      if (g.type === 'AWOI' && g.x !== "") {
        sc.aCheck = g.month;
        sc.ax = g.x;
      }
      if (g.type === 'AAWI' && g.x !== "") {
        sc.iCheck = g.month;
        sc.ix = g.x;
      }
      if (g.type === 'DATE' && g.x !== "") {
        sc.dCheck = g.month;
        sc.dx = g.x;
      }
    }

    if (goalCheck.length !== 0) {
      return (
        <div className="category">
          {sc.aCheck > sc.dCheck && sc.iCheck > sc.dCheck ? <p>Your goal cannot be met by <span className="red">deadline</span> of {`${sc.dx.split(" ")[1]} ${sc.dx.split(" ")[2]}`}.</p> : null}
          {sc.aCheck < sc.dCheck || sc.iCheck < sc.dCheck ? <p>Your goal can be met by deadline of {`${sc.dx.split(" ")[1]} ${sc.dx.split(" ")[2]}`}.</p> : null}
          {sc.iCheck >= 0 ? <p>Your goal can be met by <span className="blue">investing</span> with your assets by {`${sc.ix.split(" ")[1]} ${sc.ix.split(" ")[2]}`}.</p> : null}
          {sc.aCheck >= 0 >= 0 ? <p>Your goal can be met by <span className="green">saving</span> by {`${sc.ax.split(" ")[1]} ${sc.ax.split(" ")[2]}`}.</p> : null}
        </div>
      )
    }
  }

  return (
    <div
      className={"cardBudget budgetGraphCardGrid" +
      (props.plain ? " card-plain" : "") +
      (props.size ? ` cardBudgetSize${props.size}` : "")}
    >
      <div className={"budgetGraphHeader" + (props.hCenter ? " text-center" : "")}>
        <h4 className="title">{props.title}</h4>
        {setCategoryMessage(props.goalTrack)}
        <div className="budgetIcons">
          <div className="budgetIconsList">
            <div className="iconQuestion">
              <img src={require("../../assets/img/budget_question.png")} alt="question" height="20" width="20" />
            </div>
            <div className="iconQuit">
              <img
                src={require("../../assets/img/budget_quit.png")}
                alt="quit"
                height="20"
                width="20"
                onClick={() => props.dispatch({type: props.dispatchType})}
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
              <MenuItem value={240}>20 Years</MenuItem>
              <MenuItem value={600}>50 Years</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
 
      <div
        className={"content budgetGraphCardGraph"}
      >
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
}

export default BudgetGraphCard;
