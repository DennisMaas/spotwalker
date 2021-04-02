import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import InDepthDetailView from './components/inDepthDetailView/InDepthDetailView';
import NewPlacePage from './components/NewPlacePage';
import PlacesContextProvider from './contexts/PlacesContextProvider';
import EditPlacePage from './components/EditPlacePage';
import OverView from './components/overView/OverView';
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <PlacesContextProvider>
        <Switch>
          <Route path={'/login'}>
            <LoginPage />
          </Route>
          <Route path={'/overview'}>
            <OverView />
          </Route>
          <Route path={'/places/new'}>
            <NewPlacePage />
          </Route>
          <Route path={'/places/edit/:id'}>
            <EditPlacePage />
          </Route>
          <Route path={'/places/:id'}>
            <InDepthDetailView />
          </Route>
          <Route path={'/'}>
            <Redirect to={'/overview'} />
          </Route>
        </Switch>
      </PlacesContextProvider>
    </Router>
  );
}
export default App;
