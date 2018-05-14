import React, { Component } from 'react';
import './Users.css';
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addUser: null,
      removeUser: null,
      payload: null
    };
  }
  createUser() {
    if (this.state.addUser) {
      ipcRenderer.send('user:create', this.state.addUser);
    }
  }
  removeUser() {
    if (this.state.removeUser) {
      ipcRenderer.send('user:drop', this.state.removeUser);
    }
  }
  render() {
    return (
      <div>
        <h1>Users</h1>
        <input type="text" placeholder="username" onChange={(e) => this.setState({addUser: e.target.value})}/>
        <button onClick={this.createUser.bind(this)}>Add User</button>
        <hr/>
        <input type="text" placeholder="username" onChange={(e) => this.setState({removeUser: e.target.value})}/>
        <button onClick={this.removeUser.bind(this)}>Remove User</button>
      </div>
    );
  }
}
export default Users;
