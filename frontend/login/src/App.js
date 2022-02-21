import "./App.css";
import { Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
    </>
  );
}

export default App;
