import React, { Component } from 'react';
import './Login.css';
import { Redirect } from 'react-router'
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        config: {
          user: null,
          pass: null
        }
      };
  }
  isFilledOut() {
    const state = this.state;
    return (state.user && state.pass);
  }
  submitForm() {
    if (this.isFilledOut()) {
      ipcRenderer.send('login:submit', this.state.config);
      ipcRenderer.on('login:reply', (event, arg) => {
        // arg == true if logedIn
        if (arg) {
          this.props.logedIn();
        }
      });
    } else {
      alert('Fill out all required forms.');
    }
  }
  render() {
    return (
      <div className="Connect">
        <div className="form">
          <select defaultValue="show" className="form-item">
            <option value="show" disabled>Select your Organization</option>
            <option>Northeastern</option>
            <option>SRC</option>
          </select>
          <input className="form-item" type="text" placeholder="Username" onChange={(e) => this.setState({user: e.target.value})}></input>
          <input className="form-item" type="password" placeholder="Password" onChange={(e) => this.setState({pass: e.target.value})}></input>

          <button className="form-item" onClick={this.submitForm.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Login;
