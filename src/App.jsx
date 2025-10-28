import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import PlayOptions from './components/PlayOptions';
import Sala from './components/Sala';
import Game from './components/Game';
import './assets/styles/global.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/play-options" component={PlayOptions} />
        <Route path="/sala" component={Sala} />
        <Route path="/game" component={Game} />
      </Switch>
    </Router>
  );
}

export default App;