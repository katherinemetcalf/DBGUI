import React, { Component } from 'react';
import './Connect.css';
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Connect extends Component {
  constructor(props) {
      super(props);
      this.state = {
        user: null,
        pass: null,
        host: null,
        db: null,
        port: null
      };
  }
  submitForm() {
    console.log('clicked it!!!');
    ipcRenderer.send('connection:submit', this.state);
  }
  render() {
    return (
      <div className="Connect">
        <div className="form">
          <h4>Connect to PostgreSQL</h4>
          <input type="text" placeholder="user" onChange={(e) => this.setState({user: e.target.value})}></input>
          <input type="password" placeholder="password" onChange={(e) => this.setState({pass: e.target.value})}></input>
          <input type="text" placeholder="host" onChange={(e) => this.setState({host: e.target.value})}/>
          <input type="text" placeholder="database" onChange={(e) => this.setState({db: e.target.value})}/>
          <input type="number" placeholder="port" onChange={(e) => this.setState({port: e.target.value})}></input>
          <button onClick={this.submitForm.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Connect;
