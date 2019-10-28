import React from "react";
import { Menu, Dropdown, Button, Input } from "antd";
import axios from "axios";
import { withRouter } from "react-router";
import "./index.css";
import jwt from "jsonwebtoken";
class Panel extends React.Component {
  constructor() {
    super();
  }
  render() {
      return (
          <div className="main">
            <div className="left">
              <div className="ad">
                <div className="ad-content"></div>
              </div>
              <div className="article-list">

              </div>
            </div>
            <div className="right">

            </div>
          </div>
      )
  }
}
export default withRouter(Panel);
