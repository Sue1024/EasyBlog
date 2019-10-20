import React from "react";
import Header from "./Header"
import './index.css'

function Main() {
  return (
    <React.Fragment>
        <Header/>
        <div className="content"></div>
    </React.Fragment>
  );
}

export default Main;
