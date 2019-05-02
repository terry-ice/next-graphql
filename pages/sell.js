import React, { Component } from "react";
import CreateItem from "../components/CreateItem";
import PleaseSignIn from "../components/PleaseSignIn";
class Cell extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <CreateItem />
        </PleaseSignIn>
      </div>
    );
  }
}

export default Cell;
