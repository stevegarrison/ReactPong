import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "./pages/StartMenu";
import Options from "./pages/OptionsMenu";
import Game from "./pages/GamePage";


function App() {
  return (
    <>
      {/* //<GameCom></GameCom> */}

    <Router>
       
        <Switch>
           <Route exact path="/" component={Start} />
          <Route exact path="/options" component={Options} />
          <Route exact path="/game" component={Game} />
        </Switch>
     
   </Router>
    </>
  );
}

export default App;

{/* <Paddle initPos={{ x: 10, y: 0 }} moveUp='w' moveDown='s'></Paddle>
<Paddle initPos={{ x: 100, y: 0 }} moveUp='w' moveDown='s'></Paddle> */}