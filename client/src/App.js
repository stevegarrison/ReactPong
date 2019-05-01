import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "./pages/StartMenu";
import Options from "./pages/OptionsMenu";

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/options" component={Options} />
        </Switch>
      </>
    </Router>
  );
}

export default App;