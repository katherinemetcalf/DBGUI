import React, { Component } from 'react';
import './Login.css';
// const electron = window.require('electron');
// const ipcRenderer  = electron.ipcRenderer;

class Login extends Component {
  componentDidMount() {
    ipcRenderer.on('login:reply', this.handleReply.bind(this));
  }
  componentWillUnmount() {
    ipcRenderer.removeListener('login:reply', this.handleReply.bind(this));
  }
  constructor(props) {
      super(props);
      this.state = {
        org: null,
        username: null,
        password: null
      };
  }
  handleReply(event, arg) {
    if (arg) {
      this.props.logedIn();
    } else {
      alert('Invalid Login. Try again!');
    }
  }
  isFilledOut() {
    const state = this.state;
    return (state.username && state.password && state.org);
  }
  submitForm() {
    if (this.isFilledOut()) {
      ipcRenderer.send('login:submit', this.state);
    } else {
      alert('Fill out all required forms.');
    }
  }
  render() {
    return (
      <div className="Connect">
        <div className="form">
          <select defaultValue="default" className="form-item" onChange={(e) => this.setState({org: e.target.value})}>
            <option value="default" disabled>Select your Organization</option>
            <option>test</option>
            <option>Northeastern</option>
            <option>VRC</option>
            <option>MOOG</option>
            <option>ARL</option>
            <option>KRI</option>
            <option>UDRI</option>
          </select>
          <input className="form-item" type="text" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}></input>
          <input className="form-item" type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}></input>

          <button className="form-item" onClick={this.submitForm.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Login;
