import React, { useState } from "react";
import MyVerticallyCenteredModal2 from "../MyVerticallyCenteredModal/MyVerticallyCenteredModal2.jsx";

function CardExpTable(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className={"card" + (props.plain ? " card-plain" : "")}>
      <div
        id="exp-table-header"
        className={"header" + (props.hCenter ? " text-center" : "")}
      >
        <h3 className="title">
          {props.category} {props.title}
        </h3>
        <span className="exp-question-span">
          <img
            src={require("../../assets/img/budget_question.png")}
            alt="quit"
            height="28"
            width="26"
            onClick={() => {
              setModalShow(true);
            }}
          />
        </span>
      </div>
      <div className="category" style={{ paddingLeft: 10 }}>
        {props.content2}
      </div>
      <div
        className={
          "content" +
          (props.ctAllIcons ? " all-icons" : "") +
          (props.ctTableFullWidth ? " table-full-width" : "") +
          (props.ctTableResponsive ? " table-responsive" : "") +
          (props.ctTableUpgrade ? " table-upgrade" : "")
        }
      >
        {props.content}

        {/* <div className="footer">
          {props.legend}
          {props.stats != null ? <hr /> : ""}
          <div className="stats">
            <i className={props.statsIcon} /> {props.stats}
          </div>
        </div> */}
      </div>

      <MyVerticallyCenteredModal2
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default CardExpTable;
