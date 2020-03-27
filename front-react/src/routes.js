import Budget from "views/Budget.jsx";
import Expenses from "views/Expenses.jsx";
import Goals from "views/Goals.jsx";
import Portfolio from "views/Portfolio.jsx";
import Youtube from "views/Youtube.jsx";
import News from "views/News.jsx";
import Education from "views/Education.jsx";
import Dashboard from "views/Dashboard.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-piggy",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/goals",
    name: "Goals",
    icon: "pe-7s-target",
    component: Goals,
    layout: "/admin"
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: "pe-7s-credit",
    component: Expenses,
    layout: "/admin"
  },

  {
    path: "/portfolio",
    name: "Portfolio",
    icon: "pe-7s-graph",
    component: Portfolio,
    layout: "/admin",
    redirect: "/portfolio/start"
  },
  {
    path: "/budget",
    name: "Budget",
    icon: "pe-7s-calculator",
    component: Budget,
    layout: "/admin"
  },
  {
    path: "/news",
    name: "News",
    icon: "pe-7s-speaker",
    component: News,
    layout: "/admin"
  },
  {
    path: "/youtube",
    name: "Youtube",
    icon: "pe-7s-airplay",
    component: Youtube,
    layout: "/admin"
  },

  {
    path: "/Education",
    name: "Education",
    icon: "pe-7s-study",
    component: Education,
    layout: "/admin"
  }
];

// const staticRoute=[
//   {
//     path: "/Landing",
//     name: "landing",
//     icon: "pe-7s-graph",
//     component: Landing,
//     layout: "/"
//   }
// ]

export default dashboardRoutes;
