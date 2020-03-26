import React, { Component } from "react";

export class CardExpTable extends Component {
  render() {
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <h3 className="title">
            {this.props.category} {this.props.title} 
                <img
                  src={require("../../assets/img/budget_quit.png")}
                  alt="quit"
                  height="20"
                  width="20"
                  onClick={() => {
                    console.log('clicked')
                  }}
                />
          </h3>
        </div>
        <div className="category" style={{ paddingLeft: 10 }}>
          {this.props.content2}
        </div>
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardExpTable;
