import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import * as routes from './constants/routes';
import { auth } from './firebase/firebase.js';
import history from './history';
import TopBar from './components/TopBar';
import LandingPage from './components/LandingPage';
import HomePage from './home/Home';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {

    auth.getRedirectResult().then(result => {
      if (result.user) {
        console.log("Redirect with Login Successfull! Got User");
        history.replace(routes.HOME);
      }
    })

    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState(() => ({ authUser }));
        history.replace(routes.HOME);
      } 
      else {
        this.setState(() => ({ authUser: null}));
      };
      
    });
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <TopBar authUser={this.state.authUser}/>

          <Route
            exact path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route
            exact path={routes.HOME}
            component={() => <HomePage />}
          />
          
        </div>
      </Router>
    );
  }
}

export default App;