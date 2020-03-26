import React from 'react';
import routes from '~/routes';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TopBar from '~c/TopBar';


export default function App() {
    let routesComponents = routes.map((route) => {
        return <Route 
                path={route.url}
                component={route.component}
                exact={route.exact} 
                key={route.url}
               />;
    });

    return (
      <div>
      <Router>
        <TopBar></TopBar>
        <Switch>
            {routesComponents}
        </Switch>
      </Router>
      </div>
    )
}
