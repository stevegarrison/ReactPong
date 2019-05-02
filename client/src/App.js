import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "./pages/StartMenu";
import Options from "./pages/OptionsMenu";
import Game from "./pages/GamePage";

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/options" component={Options} />
          <Route exact path="/game" component={Game} />
        </Switch>
      </>
    </Router>
  );
}

export default App;