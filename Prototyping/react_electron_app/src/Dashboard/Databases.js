import React, { Component } from 'react';
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Databases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createDatabase: null,
      removeDatabase: null
    };
  }
  createDatabase() {
    if (this.state.createDatabase) {
      console.log("I got here");
      ipcRenderer.send('database:create', this.state.createDatabase);
    }
  }
  removeDatabase() {
    if (this.state.removeDatabase) {
      ipcRenderer.send('database:drop', this.state.removeDatabase);
    }
  }
  render() {
    return (
      <div>
        <h1>Databases</h1>
        <input type="text" placeholder="database" onChange={(e) => this.setState({createDatabase: e.target.value})}/>
        <button onClick={this.createDatabase.bind(this)}>Add Database</button>
        <hr/>
        <input type="text" placeholder="database" onChange={(e) => this.setState({removeDatabase: e.target.value})}/>
        <button onClick={this.removeDatabase.bind(this)}>Remove Database</button>
      </div>
    );
  }
}
export default Databases;
