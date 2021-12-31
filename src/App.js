import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

import Navigation from './components/navigation';
import Pages from './pages/router'
//Serves pages and router page
function App() {
  return (
    <Router >
      <div className="App">
          <Navigation />
          <Pages />
      </div>
    </Router>
  );
}

export default App;