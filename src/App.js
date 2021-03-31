import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from './home/home'
import Rule from './rule/rule'
import Game from './game/game'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/rule" component={Rule}></Route>
        <Route exact path="/game" component={Game}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;