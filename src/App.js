import Login from "./components/auth/Login";
import AdminPanel from "./roles/admin/AdminPanel";
import StudentPanel from "./roles/student/StudentPanel";
import TrainerPanel from "./roles/trainer/TrainerPanel";
import { isAuth } from "./actions/auth";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const role = authCtx.user?.role;
  return (
    <div className="App">
      {isLoggedIn ? (
        role == 1 ? (
          <AdminPanel />
        ) : role == 2 ? (
          <TrainerPanel />
        ) : (
          <StudentPanel />
        )
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
