import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import OverView from './components/OverView';
import InDepthDetailView from './components/inDepthDetailView/InDepthDetailView';
import PlacesContextProvider from './contexts/PlacesContextProvider';
import NewPlacePage from './components/NewPlacePage';
import usePlaces from './components/hooks/usePlaces';

function App() {
  const [places, create, update] = usePlaces();

  return (
    <Router>
      <PlacesContextProvider>
        <Switch>
          <Route path={'/overview'}>
            <OverView places={places} />
          </Route>
          <Route path={'/places/new'}>
            <NewPlacePage create={create} />
          </Route>
          <Route path={'/places/:id'}>
            <InDepthDetailView places={places} />
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
