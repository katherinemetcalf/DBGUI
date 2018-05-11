import React, { Component } from 'react';
import './Query.css';
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Query extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      results: null
    };
  }
  handleChange(e) {
    this.setState({query: e.target.value});
  }
  handleSubmit() {
    const query = this.state.query;
    if (query) {
      console.log(query);
      ipcRenderer.send('query:execute', query);
      ipcRenderer.on('query:reply', (event, arg) => {
       this.setState({results: arg});
      });
    }
  }
  render() {

    return (
      <div className="Query">
        <h1>Query the Database</h1>
        <textarea
          rows="4" cols="50"
          placeholder="/* I trust you... right? */"
          onChange={this.handleChange.bind(this)}
          ></textarea>
        <button onClick={this.handleSubmit.bind(this)}>Execute</button>
        <div>
          { this.state.results?  this.state.results.map(item => {
                   return (
                     <div key={item.id}>
                       <h3>Name: {item.name}, id: {item.id}, price: {item.price}</h3>
                     </div>
                   )
                 }): null}
        </div>
      </div>
    )
  }
}
//<input type="text" value={this.state.query} onChange={this.handleChange.bind(this)}/>

export default Query;
