import React, { Component } from 'react';
import logo from './img/SolvusGlobalLogo.png';
import './App.css';
import Connect from './Connect';
import Dashboard from './Dashboard/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false
    };
  }
  establishedConnection() {
    this.setState({connected: true});
  }
  render() {
    const display = this.state.connected?
      (<Dashboard />) :
      (<Connect connected={this.establishedConnection.bind(this)}/>);
    return (
      <div className="App">
        <div className="heading">
          <h1 style={{"color": "#21A7E0"}}>SOLVUS</h1>
          <img src={logo} alt="Solvus Global Logo" className="solvusLogo" style={{"width": "60px"}}/>
          <h1 style={{"color": "#B3B5B8"}}>GLOBAL</h1>
        </div>
        <div className="display">
          {display}
        </div>
      </div>
    );
  }
}

export default App;
