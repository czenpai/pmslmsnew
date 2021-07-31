import React from "react";
import {
  FaBook,
  FaMeteor,
  FaPeopleCarry,
  FaRocket,
  FaUser,
  FaUserAstronaut,
} from "react-icons/fa";
import Navigation from "../../components/navigation/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AdminDashBoard from "./pages/dashboard/AdminDashBoard";
import StudentManagement from "./pages/usermanagement/StudentManagement";
import ViewBatches from "./pages/batchmanagement/BatchMangement";
import CourseManagement from "./pages/courses/CourseManagement";

const AdminPanel = () => {
  const routes = [
    {
      route: "/dashboard",
      title: "Dashboard",
      subroutes: [],
      icon: FaMeteor,
      page: <AdminDashBoard />,
    },
    {
      route: "/user-management",
      title: "User Management",
      page: <StudentManagement />,
      subroutes: [],
      icon: FaUser,
    },
    {
      route: "/batch-management",
      title: "Batch Management",
      page: <ViewBatches />,
      subroutes: [],
      icon: FaPeopleCarry,
    },
    {
      route: "/course-management",
      title: "Courses",
      subroutes: [],
      icon: FaBook,
      page: <CourseManagement />,
    },
    // {
    //   route: "/marketing",
    //   title: "Marketing",
    //   subroutes: [],
    //   icon: FaRocket,
    //   page: <CourseManagement />,
    // },
    // {
    //   route: "/profile",
    //   title: "My Profile",
    //   subroutes: [],
    //   icon: FaUserAstronaut,
    //   page: <CourseManagement />,
    // },
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
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          {generateRouting(routes)}
          {generateSubRouting(routes)}
        </Switch>
      </Navigation>
    </Router>
  );
};

export default AdminPanel;
