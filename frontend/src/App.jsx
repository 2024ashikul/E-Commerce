import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <Router>
      <Navbar /> {/* The navigation bar is displayed on all pages */}
      <div className="container">
        <Switch>
          {/* Define your routes here */}
          <Route exact path="/" component={HomePage} />
          <Route path="/product/:id" component={ProductPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
