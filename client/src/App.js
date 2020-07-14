import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './routes/home'
import './CSS/App.css';
import chatbot_page from './routes/chatbot_page';
import classic_weather from './routes/classic_weather'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/chatbot" component={chatbot_page}></Route>
          <Route exact path="/classic-weather" component={classic_weather}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
