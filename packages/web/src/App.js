import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './screen/Home'
import CMS from './screen/CMS'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/cms" component={CMS}/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
