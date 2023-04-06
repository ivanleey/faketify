import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/layouts/Layout";
import {
  BrowserRouter,
  Link,
  useRoutes,
  Navigate,
  Outlet,
} from "react-router-dom";

import routes from "./routerConfig";
function App() {
  const element = useRoutes(routes);
  return (
    <div className="App">
      {element}

      {/* <Navigate to="/home"/> */}
    </div>
  );
}

export default App;
