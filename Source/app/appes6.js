import React from "react";
import {render} from "react-dom";
import {Trangchu} from "./components/Trangchu";

class Appes6 extends React.Component {
  render(){
    return (
      <div>
      	<h1>Welcome to appes6</h1>
      	<Trangchu/>
      </div>
    );
  }
}

render(<Appes6/>, window.document.getElementById("appes6"));