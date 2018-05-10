import React, { Component } from 'react';
import './Connect.css';
import { Redirect } from 'react-router'
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Connect extends Component {
  constructor(props) {
      super(props);
      this.state = {
        config: {
          user: null,
          pass: null,
          host: null,
          db: null
        }
      };
  }
  isFilledOut() {
    const state = this.state;
    return (state.user && state.pass && state.host && state.db);
  }
  submitForm() {
    if (this.isFilledOut()) {
      ipcRenderer.send('connection:submit', this.state.config);
      ipcRenderer.on('connection:reply', (event, arg) => {
        // arg == true if connection established
        if (arg) {
          this.props.connected();
        }
      });
    } else {
      alert('Fill out all required forms.');
    }
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.submitForm();
    }
  }
  render() {
    return (
      <div className="Connect">
        <div className="form">
          <h4>Connect to PostgreSQL</h4>
          <input type="text" placeholder="user" onKeyPress={this.handleKeyPress.bind(this)} onChange={(e) => this.setState({user: e.target.value})}></input>
          <input type="password" placeholder="password" onChange={(e) => this.setState({pass: e.target.value})}></input>
          <input type="text" placeholder="host" onChange={(e) => this.setState({host: e.target.value})}/>
          <input type="text" placeholder="database" onChange={(e) => this.setState({db: e.target.value})}/>
          <button onClick={this.submitForm.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Connect;
