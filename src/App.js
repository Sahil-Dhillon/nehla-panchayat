import React from 'react'
// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//css
import './App.css';
// pages
import Home from './pages/home';
import Gallery from './pages/gallery';
import PDS from './pages/pds';
// navbar
import Navbar from './Components/Navbar';
//footer
import Footer from './Components/Footer'
import Error from './pages/Error';
import Admin from './pages/Admin';



function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/gallery'>
          <Gallery />
        </Route>
        <Route path='/PDS'>
          <PDS />
        </Route>
        <Route path='/Admin'>
          <Admin />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
