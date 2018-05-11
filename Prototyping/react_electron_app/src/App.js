import React, { Component } from 'react';
import logo from './img/SolvusGlobalLogo.png';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logedIn: false
    };
  }
  logedIn() {
    this.setState({logedIn: true});
  }
  render() {
    const display = this.state.logedIn?
      (<Dashboard />) :
      (<Login logedIn={this.logedIn.bind(this)}/>);
    return (
      <div className="App">
        <div className="heading">
          <h1 style={{"color": "#21A7E0"}}>SOLVUS</h1>
          <img src={logo} alt="Solvus Global Logo" className="solvusLogo" style={{"width": "60px"}}/>
          <h1 style={{"color": "#B3B5B8"}}>GLOBAL</h1>
        </div>
        <div className="display">
          {/* display */}
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default App;
