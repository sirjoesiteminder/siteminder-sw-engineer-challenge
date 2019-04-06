import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <form
          action="mailto:someone@example.com"
          method="post"
          enctype="text/plain"
        >
          Name:
          <br />
          <input type="text" name="name" />
          <br />
          E-mail:
          <br />
          <input type="text" name="mail" />
          <br />
          Comment:
          <br />
          <input type="text" name="comment" size="50" />
          <br />
          <br />
          <input type="submit" value="Send" />
          <input type="reset" value="Reset" />
        </form>
      </div>
    );
  }
}

export default App;
