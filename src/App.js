import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';
import Login from './components/Login';
import Header from './components/Header';
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/create" component={CreateLink}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route path="/" component={LinkList}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
