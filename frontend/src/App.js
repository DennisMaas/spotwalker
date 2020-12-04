import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import OverViewList from './components/OverViewList';
import InDepthDetailView from './components/inDepthDetailView/InDepthDetailView';
import NewPlacePage from './components/NewPlacePage';
import PlacesContextProvider from './contexts/PlacesContextProvider';
import EditPlacePage from './components/EditPlacePage';
import OverViewMaps from './components/OverViewMaps';

function App() {
  return (
    <Router>
      <PlacesContextProvider>
        <Switch>
          <Route path={'/overviewlist'}>
            <OverViewList />
          </Route>
          <Route path={'/overviewmaps'}>
            <OverViewMaps />
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
            <Redirect to={'/overviewlist'} />
          </Route>
        </Switch>
      </PlacesContextProvider>
    </Router>
  );
}
export default App;
