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

  return (
    <div
      className={"card budgetGraphCardGrid" + (props.plain ? " card-plain" : "")}>
      <div className={"header" + (props.hCenter ? " text-center" : "")}>
        <h4 className="title">{props.title}</h4>
        <p className="category">{props.category}</p>
      </div>
      <div className="budgetGraphCardRange">
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
          </Select>
        </FormControl>
      </div>
      <div
        className={
          "content budgetGraphCardGraph" +
          (props.ctAllIcons ? " all-icons" : "") +
          (props.ctTableFullWidth ? " table-full-width" : "") +
          (props.ctTableResponsive ? " table-responsive" : "") +
          (props.ctTableUpgrade ? " table-upgrade" : "")
        }
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
