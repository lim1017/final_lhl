/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Goal from "components/Goal/index.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import useAppData from "../hooks/useAppData";
import { MDBDataTable } from 'mdbreact';

import avatar from "assets/img/faces/face-3.jpg";

function UserProfile(props) {
  const{
    state
  } = useAppData();

  const GoalsInList = state.goals.map(goal => {
    return (
      <Goal
        key={goal.id}
        name={goal.name}
        category="Here is a subtitle for this table"
        type={goal.type}
        amount={goal.amount}
        description={goal.description}
        date={goal.date}
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
                  </div>

                  // <div>
                  //   <MDBDataTable
                  //     scrollY
                  //     maxHeight="300px"
                  //     striped
                  //     bordered
                  //     small
                  //     data={{
                  //       columns: [
                  //         {
                  //           label: 'Name',
                  //           field: 'name',
                  //           sort: 'asc',
                  //           width: 150
                  //         },
                  //         {
                  //           label: 'Type',
                  //           field: 'type',
                  //           sort: 'asc',
                  //           width: 150
                  //         },
                  //         {
                  //           label: 'Amount',
                  //           field: 'amount',
                  //           sort: 'asc',
                  //           width: 150
                  //         },
                  //         {
                  //           label: 'Date',
                  //           field: 'date',
                  //           sort: 'asc',
                  //           width: 150
                  //         }
                  //       ],
                  //       rows: state.expenses
                  //     }}
                  //   />
                  // </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      <StatsCard />
    </div>
  );

}

export default UserProfile;
