import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });
  }

  addNewSmurf = smurf => {
    axios
      .post("http://localhost:3333/smurfs", smurf)
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <div className="navBar">
          <NavLink className="navLink" exact to="/">
            Home
          </NavLink>
          <NavLink className="navLink" to="/smurf-form">
            Add Smurf
          </NavLink>
          <img
          src="https://images.justwatch.com/backdrop/46395655/s1440/the-smurfs"
          alt="smurfs"
        />
        </div>
        {/* <img
          src="https://images.justwatch.com/backdrop/46395655/s1440/the-smurfs"
          alt="smurfs"
        /> */}
        <div className="main">
          <Route
            path="/smurf-form"
            render={props => (
              <SmurfForm {...props} addNewSmurf={this.addNewSmurf} />
            )}
          />

          <Route
            path="/"
            render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
