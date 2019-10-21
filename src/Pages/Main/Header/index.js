import React from "react";
import { Menu, Dropdown, Button, Input } from "antd";
import axios from "axios";
import { withRouter } from "react-router";
import "./index.css";
import jwt from "jsonwebtoken";
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      username: ""
    };
  }
  onLogin = () => {
    this.props.history.push("/sign_in");
  };
  onRegister = () => {
    this.props.history.push("/sign_up");
  };
  onLogout = () => {
    const instance = axios.delete(
      "http://192.168.3.3:8080/user-service/user/logout",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      }
    );
    instance.then(
      response => {
        if (response.status === 200 || response.status === 401) {
          localStorage.setItem("access_token", null);
          localStorage.setItem("refresh_token", null);
          this.setState({
            username: ""
          });
        }
      },
      error => {
        console.log(error);
        if (error.toString().includes("401")) {
          axios.post(
            "http://192.168.3.3:8080/user-service/auth-management/update-token",
            null,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },

              transformRequest: [
                function(data) {
                  let ret = "";
                  for (let it in data) {
                    ret +=
                      encodeURIComponent(it) +
                      "=" +
                      encodeURIComponent(data[it]) +
                      "&";
                  }
                  return ret;
                }
              ],

              data: {
                refreshToken: localStorage.getItem("refresh_token")
              }
            }
          );
        }
        localStorage.setItem("access_token", null);
        localStorage.setItem("refresh_token", null);
        this.setState({
          username: ""
        });
      }
    );
  };
  componentDidMount() {
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      this.setState({
        username: jwt.decode(access_token) && jwt.decode(access_token).username
      });
    } else {
      this.setState({
        username: ""
      });
    }
  }
  componentWillReceiveProps() {
    let access_token = localStorage.getItem("access_token");
    setTimeout(() => {
      if (access_token) {
        this.setState({
          username:
            jwt.decode(access_token) && jwt.decode(access_token).username
        });
      } else {
        this.setState({
          username: ""
        });
      }
    });
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
        <div className="center">
          <Input.Search
            placeholder="搜索"
            onSearch={value => console.log(value)}
            className="input-wrapper"
          />
        </div>
        <div className="right">
          {this.state.username ? (
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button className="user">{this.state.username}</Button>
            </Dropdown>
          ) : (
            <React.Fragment>
              <Button className="user" onClick={this.onLogin}>
                登录
              </Button>
              <Button className="register" onClick={this.onRegister}>
                注册
              </Button>
            </React.Fragment>
          )}
          <Button
            type="primary"
            shape="round"
            icon="pic-right"
            className="write"
          >
            写文章
          </Button>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
