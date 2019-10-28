import React from "react";
import { withRouter } from "react-router";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import LoginPhone from "./login_phone";
import LoginUserName from "./login_username";
import axios from "axios";

class LoginType {
  static USER_NAME = "username";
  static PHONE_NUM = "phone_num";
  static EMAIL = "email";
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: LoginType.USER_NAME
    };
  }

  onPhoneClick = () => {
    this.setState({
      current:LoginType.PHONE_NUM
    })
  }

  onUserNameClick = () => {
    this.setState({
      current:LoginType.USER_NAME
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.current === LoginType.USER_NAME ? (
          <React.Fragment>
            <LoginUserName></LoginUserName>
            <a onClick={this.onPhoneClick}>手机验证码登录</a>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <LoginPhone></LoginPhone>
            <a onClick={this.onUserNameClick}>用户名密码登录</a>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "login" })(Login);
export default withRouter(WrappedLoginForm);
