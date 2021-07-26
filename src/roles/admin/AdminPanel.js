import React from "react";
import { FaBook, FaMeteor, FaPeopleCarry, FaUser } from "react-icons/fa";
import Navigation from "../../components/navigation/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AdminDashBoard from "./pages/dashboard/AdminDashBoard";
import StudentManagement from "./pages/usermanagement/StudentManagement";
import TrainerManagement from "./pages/usermanagement/TrainerManagement";
import ViewBatches from "./pages/batchmanagement/ViewBatches";
import CreateBatch from "./pages/batchmanagement/CreateBatch";
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
      subroutes: [
        { route: "/student", title: "Student", page: <StudentManagement /> },
        { route: "/trainer", title: "Trainer", page: <TrainerManagement /> },
      ],

      icon: FaUser,
    },
    {
      route: "/batch-management",
      title: "Batch Management",
      subroutes: [
        {
          route: "/view-batches",
          title: "View Batches",
          page: <ViewBatches />,
        },
        {
          route: "/create-batch",
          title: "Create Batch",
          page: <CreateBatch />,
        },
      ],
      icon: FaPeopleCarry,
    },
    {
      route: "/course-management",
      title: "Courses",
      subroutes: [],
      icon: FaBook,
      page: <CourseManagement />,
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
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          {generateRouting(routes)}
          {generateSubRouting(routes)}
        </Switch>
      </Navigation>
    </Router>
  );
};

export default AdminPanel;
