import React from "react";
import { Menu, Dropdown, Button } from "antd";
import axios from "axios";
import { withRouter } from "react-router"
import "./index.css";
class Header extends React.Component {
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
    this.state = {
        username: ''
    }
    this.onLogin = this.onLogin.bind(this)
  }
  onLogin () {
      this.props.history.push('/sign_in')
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
    instance.then(response => {
        if (response.status === 200 || response.status === 401) {
          localStorage.setItem("access_token", null);
          localStorage.setItem("refresh_token", null);
          this.setState({
              username: ''
          })
        }
      });
  }
  componentDidMount() {
    let access_token = localStorage.getItem("access_token");
    if(access_token) {
        this.setState({
            username: "Sue",
        })
    } else {
        this.setState({
            username: ''
        })
    }
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
        { this.state.username ? 
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button className="user">{this.state.username}</Button>
        </Dropdown>
        : <Button className="user" onClick={this.onLogin}>登录</Button>
        }
      </div>
    );
  }
}
export default withRouter(Header)