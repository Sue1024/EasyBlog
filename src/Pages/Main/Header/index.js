import React from "react";
import { Menu, Dropdown, Button } from "antd";
import axios from "axios";
import "./index.css";
export default class Header extends React.Component {
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout() {
    const instance = axios.delete(
      "http://192.168.3.3:8080/user-service/user/logout",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      }
    );
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.onLogout}>退出登录</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        <div className="logo">Easy Blog</div>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button className="user">bottomLeft</Button>
        </Dropdown>
      </div>
    );
  }
}
