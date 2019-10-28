import React from "react";
import Header from "./Header"
import Panel from "./Panel"
import './index.css'

function Main() {
  return (
    <React.Fragment>
        <Header/>
        <div className="panel"><Panel></Panel></div>
    </React.Fragment>
  );
}

export default Main;
