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
import Budget from "views/Budget.jsx";
import Expenses from "views/Expenses.jsx";
import Goals from "views/Goals.jsx";
import Portfolio from "views/Portfolio.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";

const dashboardRoutes = [
  {
    path: "/expenses",
    name: "Expenses",
    icon: "pe-7s-graph",
    component: Expenses,
    layout: "/admin"
  },
  {
    path: "/goals",
    name: "Goals",
    icon: "pe-7s-user",
    component: Goals,
    layout: "/admin"
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    icon: "pe-7s-note2",
    component: Portfolio,
    layout: "/admin"
  },
  {
    path: "/budget",
    name: "Budget",
    icon: "pe-7s-note2",
    component: Budget,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "News",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Quiz",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Survey",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  }
];

export default dashboardRoutes;
