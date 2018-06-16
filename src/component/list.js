import React, { Component } from "react";

class List extends Component {
  render() {
    return (
      <div className="List">
        <header className="List-header">
          <h1 className="App-title">Welcome to List</h1>
        </header>
        <ul>
          <li>first</li>
          <li>second</li>
        </ul>
        <Item/>
      </div>
    );
  }
}

export default List;
