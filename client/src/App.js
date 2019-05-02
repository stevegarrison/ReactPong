import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Game from "./components/Game"
import Paddle from "./components/Paddle"
import Start from "./pages/StartMenu"
//import Canvas from "./components/Canvas"
 
// import Options from "./pages/OptionsMenu";

function App() {
  return (
    <>
      <Game />
      {/* <Paddle initPos={{ x: 10, y: 0 }} moveUp='w' moveDown='s'></Paddle> */}
  </>
    
    // <Router>
    //   <>
    //     <Switch>
    //       <Route exact path="/" component={Start} />
    //       <Route exact path="/options" component={Options} />
    //     </Switch>
    //   </>
    // </Router>
  );
}

export default App;

{/* <Paddle initPos={{ x: 10, y: 0 }} moveUp='w' moveDown='s'></Paddle>
<Paddle initPos={{ x: 100, y: 0 }} moveUp='w' moveDown='s'></Paddle> */}