import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "./pages/StartMenu";
import Options from "./pages/OptionsMenu";
import Game from "./pages/GamePage";
import GameAI from "./pages/GameAIPage";
import GamePractice from "./pages/GamePracticePage";

function App() {
  return (
    <>
      {/* //<GameCom></GameCom> */}

    <Router>
       
        <Switch>
           <Route exact path="/" component={Start} />
          <Route exact path="/options" component={Options} />
          <Route exact path="/gameOnePlayer" component={Game} />
          <Route exact path="/gameTwoPlayer" component={GameAI} />
          <Route exact path="/practice" component={GamePractice} />
        </Switch>
     
   </Router>
    </>
  );
}

export default App;
