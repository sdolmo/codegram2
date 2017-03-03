// Codegram router/render file

import React from 'react';
import { render } from 'react-dom';

// import styles

// Import components
import App from './components/App';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

// Import react router dependencies
import { Router, Route, IndexRoute, borwserHistory } from 'react-router';

const router = (
  <Provider>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PhotoGrid}></IndexRoute>
        <Route path="/view/:postId" component={Single}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
