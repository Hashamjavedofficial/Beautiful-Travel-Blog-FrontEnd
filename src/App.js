import React from "react";
import Users from "./Users/Pages/Users";
import NewPlace from "./Places/Pages/NewPlace";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/NewPlace">
          <NewPlace />
        </Route>

        <Redirect to={"/"} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
