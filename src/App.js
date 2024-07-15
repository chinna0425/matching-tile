import { BrowserRouter, Route, Switch } from "react-router-dom";
import GamePage from "./components/GamePage";

import ScoreCard from "./components/ScoreCard";
import WelcomePage from "./components/WelcomePage";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route exact path="/Gamepage" component={GamePage} />
      <Route exact path="/scorecard" component={ScoreCard} />
    </Switch>
  </BrowserRouter>
);
export default App;
