import "./App.css";
import { Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <>
      <Route exact path="/">
        <LoginPage />
      </Route>
    </>
  );
}

export default App;
