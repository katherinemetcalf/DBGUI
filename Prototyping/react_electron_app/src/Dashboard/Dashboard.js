import React, { Component } from 'react';
import './Dashboard.css';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Navigation from './Navigation';
import Home from './Home';
import Users from './Users';
import Databases from './Databases';
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Dashboard extends Component {
  render() {
    return (
        <Router>
          <div className="Dashboard">

            <Navigation />

            <div className="mainWindow">
              <Route exact path="/" component={Home} />
              <Route path="/users" component={Users} />
              <Route path="/databases" component={Databases} />
            </div>
          </div>
        </Router>
    );
  }
}
export default Dashboard;
