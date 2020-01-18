import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieDetail from './pages/detail';
import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles['app-container']}>
      <Header />
      <Router>
        <div className={styles['body-section']}>
          <Route path="/" exact component={Home} />
          <Route path="/movie/:id" component={MovieDetail} />
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
