import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import './renderer';
// const Renderer = require('./renderer.js');
// console.log(window.Renderer);



class App extends Component {
  componentDidMount() {
    // 
    //
    //
    console.log(window.ipcRenderer);
	}
  handleClick() {
    // console.log(this.Renderer.isHere);
  }
  render() {


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => this.handleClick.bind(this)}>Send to MAIN</button>
      </div>
    );
  }
}

export default App;
