import React, { Component } from 'react';
import logo from './img/SolvusGlobalLogo.png';
import './App.css';
import Connect from './Connect';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="heading">
          <h1 style={{"color": "#21A7E0"}}>SOLVUS</h1>
          <img src={logo} alt="Solvus Global Logo" className="solvusLogo" style={{"width": "60px"}}/>
          <h1 style={{"color": "#B3B5B8"}}>GLOBAL</h1>
        </div>

        <Connect />

      </div>
    );
  }
}

export default App;
