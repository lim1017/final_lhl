import React, {Component} from 'react';

import Picker from 'react-month-picker'
import 'react-month-picker/css/month-picker.css';


class MonthBox extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = {
          value: this.props.value || 'N/A',
      }
      this._handleClick = this._handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
      this.setState({
          value: nextProps.value || 'N/A',
      })
    }

    render() {
      return (
        <div className="box" onClick={this._handleClick}>
            <label>{this.state.value}</label>
        </div>
      );
    }

    _handleClick(e) {
      this.props.onClick && this.props.onClick(e);
    }
}


class List extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            mvalue: props.currentMonth,
            mrange: {from: {year: 2019, month: 8}, to: {year: 2021, month: 12}},
            // mrange2: {from: {year: 2013, month: 11}, to: {year: 2016, month: 3}},
        }

        this.handleClickMonthBox = this.handleClickMonthBox.bind(this)
        this.handleAMonthChange = this.handleAMonthChange.bind(this)
        this.handleAMonthDissmis = this.handleAMonthDissmis.bind(this)

        this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
        this.handleRangeChange = this.handleRangeChange.bind(this)
        this.handleRangeDissmis = this.handleRangeDissmis.bind(this)

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value || 'N/A',
        })
    }

    render() {

        const pickerLang = {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            from: 'From', to: 'To',
        }
        const mvalue = this.state.mvalue
            // , mrange = this.state.mrange

        const makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
            return '?'
        }

        return (
           <div className="edit">
                    <h4 >Change Month</h4>
                    
                        <Picker
                            ref="pickAMonth"
                            years={[2019, 2020, 2021]}
                            value={mvalue}
                            lang={pickerLang.months}
                            onChange={this.handleAMonthChange}
                            onDismiss={this.handleAMonthDissmis}
                            chgMonth={this.props.chgMonth}
                        >
                            <MonthBox value={makeText(mvalue)}
                             chgMonth={this.props.chgMonth}
                             onClick={this.handleClickMonthBox} />
                        </Picker>
                    </div>
          
        )
    }

    handleClickMonthBox(e) {
        this.refs.pickAMonth.show()
    }
    handleAMonthChange(e, value, text) {
      
    }
    handleAMonthDissmis(value) {
        this.setState( {mvalue: value} )
        this.props.chgMonth(value)
    }

    _handleClickRangeBox(e) {
        this.refs.pickRange.show()
    }
    handleRangeChange(value, text, listIndex) {
        //
    }
    handleRangeDissmis(value) {
        this.setState( {mrange: value} )
    }

}

class Main extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: this.props.value
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value
        })
    }

    render() {
        return (
            <div className="list-area">
                <List {...this.props} />
            </div>
        )
    }
}



export default (props) => {
  return (<Main {...props} />);
}
