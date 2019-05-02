import React, { Component } from "react";
import PleaseSignIn from "../components/PleaseSignIn";
import Permiss from "../components/Permissions";
class Permissions extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <Permiss />
        </PleaseSignIn>
      </div>
    );
  }
}

export default Permissions;
