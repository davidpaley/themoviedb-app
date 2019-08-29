import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieDetail from './pages/detail';
import Home from './pages/home';
import Header from './components/header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <div className="body-section">
          <Route path="/" exact component={Home} />
          <Route path="/movie/:id" component={MovieDetail} />
        </div>
      </Router>
    </div>
  );
}

export default App;
