import React from "react";
import { FaStream, FaBookOpen, FaForumbee, FaUser } from "react-icons/fa";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ActivityStream from "./pages/ActivityStream";
import Courses from "./pages/Courses";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import Navigation from "../../components/navigation/Navigation";
import { FiLogOut } from "react-icons/fi";
import Logout from "../../components/auth/Logout";
function StudentPanel() {
  const routes = [
    {
      route: "/activity-stream",
      title: "Activity Stream",
      subroutes: [],
      icon: FaStream,
      page: <ActivityStream />,
    },
    {
      route: "/courses",
      title: "Courses",
      subroutes: [],
      icon: FaBookOpen,
      page: <Courses />,
    },
    {
      route: "/forum",
      title: "Forum",
      subroutes: [],
      icon: FaForumbee,
      page: <Forum />,
    },
    {
      route: "/profile",
      title: "Profile",
      subroutes: [],
      icon: FaUser,
      page: <Profile />,
    },
  ];
  const generateRouting = (routes) => {
    return routes.map((r) => {
      return r.subroutes.length == 0 ? (
        <Route path={r.route}>{r.page}</Route>
      ) : null;
    });
  };

  const generateSubRouting = (routes) => {
    return routes.map((r) => {
      if (r.subroutes.length > 0)
        return r.subroutes.map((subroute) => {
          return <Route path={r.route + subroute.route}>{subroute.page}</Route>;
        });
    });
  };
  return (
    <Router>
      <Navigation sidebarcontent={routes}>
        <Switch>
          {generateRouting(routes)}
          {generateSubRouting(routes)}
        </Switch>
      </Navigation>
    </Router>
  );
}

export default StudentPanel;
