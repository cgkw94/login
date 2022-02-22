import "./App.css";
import { Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/admin">
        <AdminPage />
      </Route>
    </>
  );
}

export default App;
