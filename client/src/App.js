import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "./pages/StartMenu";
import Options from "./pages/OptionsMenu";
import Game from "./pages/GamePage";
import GameAI from "./pages/GameAIPage";


function App() {
  return (
    <>
      {/* //<GameCom></GameCom> */}

    <Router>
       
        <Switch>
           <Route exact path="/" component={Start} />
          <Route exact path="/options" component={Options} />
          <Route exact path="/game1" component={Game} />
          <Route exact path="/game2" component={GameAI} />
        </Switch>
     
   </Router>
    </>
  );
}

export default App;

{/* <Paddle initPos={{ x: 10, y: 0 }} moveUp='w' moveDown='s'></Paddle>
<Paddle initPos={{ x: 100, y: 0 }} moveUp='w' moveDown='s'></Paddle> */}