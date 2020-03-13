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
import React from "react";
import CardImg from "components/Card/CardImg.jsx";
import { ProgressBar } from 'react-bootstrap';




function Maps({ ...prop }) {
  return (
    <div>
    <h1>🅔🅓🅤🅒🅐🅣🅘🅞🅝</h1>
    <br />
    <br />
    <br />
    <br />

    <div class="row education">
      <div>
        <a href="https://www.moneyadviceservice.org.uk/en/articles/beginners-guide-to-managing-your-money"> 
        <CardImg description='Learn about MONEY' />
        </a>
      </div>
      <div>
        <a href="https://www.getsmarteraboutmoney.ca/invest/savings-plans/tfsas/comparing-tfsas-and-rrsps/"> 
        <CardImg description='TFSA VS RRSP' />
        </a>
      </div>
      <div>
        <a href="https://finance.zacks.com/difference-between-stocks-bonds-mutual-funds-2329.html"> 
        <CardImg description='Stocks/Bonds/Mutual Funds, Whats right for you?' />
        </a>
      </div>
      
    </div>
    <br />
    <br />
    <br />
    <br />


    <div class="row education">
      <div> <CardImg /></div>
      <div> <CardImg /></div>
      <div> <CardImg /></div>
    </div>

    <br />
    <br />
    <br />
    <br />
    <ProgressBar now={60} label='60' />
    
   </div>
  );
}

export default Maps;
