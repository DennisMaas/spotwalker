import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import OverView from './components/OverView';
import InDepthDetailView from './components/inDepthDetailView/InDepthDetailView';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/overview" component={OverView} />
        <Route path="/placedetail" component={InDepthDetailView} />
        <Route path="/">
          <Redirect to="/overview" /> />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
