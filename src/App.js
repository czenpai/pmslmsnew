import Login from "./components/auth/Login";
import AdminPanel from "./roles/admin/AdminPanel";
import StudentPanel from "./roles/student/StudentPanel";
import TrainerPanel from "./roles/trainer/TrainerPanel";
import { isAuth } from "./actions/auth";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import LoginBeauty from "./components/auth/LoginBeauty";
import LoginGoogle from "./components/auth/LoginGoogle";

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
        <LoginBeauty />
      )}
    </div>
  );
}

export default App;
