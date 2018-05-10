import React, { Component } from 'react';
import './Dashboard.css';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
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
            <div className="navigation">
              <Link className="sideNavLink" to="/">Home</Link>
              <Link className="sideNavLink" to="/users">Users</Link>
              <Link className="sideNavLink" to="/databases">Databases</Link>
            </div>
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
