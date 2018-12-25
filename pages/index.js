import React, { Component } from "react";
import Items from "../components/items";

class Index extends Component {
  render() {
    return <Items page={parseFloat(this.props.query.page) ||1}/>;
  }
}

export default Index;
