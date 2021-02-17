import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import { Builds } from './components/Builds.jsx';
import { Rooms } from './components/Rooms.jsx';
import { Reserves } from './components/Reserves.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/builds">
          <Builds />
        </Route>
        <Route
          exact
          path="/rooms"
        >
          <Rooms />
        </Route>
        <Route
          exact
          path="/reserves">
          <Reserves />

        </Route>
        <Route
          exact
          path="/builds/:buildsId/rooms"
          render={({ match }) =>
          <Rooms
            match={match}
          />
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
