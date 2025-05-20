import { useAuth } from "./contexts/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const MainApp = () => {
  const { handleLogout } = useAuth();
  return (
    <div>
      <Dashboard onLogout={handleLogout} />
    </div>
  );
};

function App() {
  const { isLoggedIn, currentView } = useAuth();

  if (isLoggedIn) {
    return <MainApp />;
  }

  return currentView === "login" ? <Login /> : <Register />;
}

export default App;
