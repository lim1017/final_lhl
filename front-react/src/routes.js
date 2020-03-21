import Budget from "views/Budget.jsx";
import Expenses from "views/Expenses.jsx";
import Goals from "views/Goals.jsx";
import Portfolio from "views/Portfolio.jsx";
import Youtube from "views/Youtube.jsx";
import News from "views/News.jsx";
import Education from "views/Education.jsx";
import Notifications from "views/Notifications.jsx";
import Dashboard from "views/Dashboard.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-bell",
    component: Dashboard,
    layout: "/admin"
  },
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
    layout: "/admin",
    redirect: "/portfolio/start"
  },
  {
    path: "/budget",
    name: "Budget",
    icon: "pe-7s-note2",
    component: Budget,
    layout: "/admin"
  },
  {
    path: "/youtube",
    name: "Youtube",
    icon: "pe-7s-news-paper",
    component: Youtube,
    layout: "/admin"
  },
  {
    path: "/news",
    name: "News",
    icon: "pe-7s-science",
    component: News,
    layout: "/admin"
  },
  {
    path: "/Education",
    name: "Education",
    icon: "pe-7s-map-marker",
    component: Education,
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
