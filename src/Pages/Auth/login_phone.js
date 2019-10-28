import React from "react";
import { withRouter } from "react-router";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import axios from "axios";
class LoginType {
  static USER_NAME = "username";
  static VERIFY_CODE = "verify_code";
  static EMAIL = "email";
}
class LoginPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      count: 10
    };
  }

  getCode = () => {
    const instance = axios.get(
      `http://192.168.3.3:8080/user-service/sms/get-verify-code?phoneNum=${this.state.phoneNum}`
    );
    // instance.then(response => {
    //   if (response.status === 200) {
    //     localStorage.setItem("access_token", response.data.access_token);
    //     localStorage.setItem("refresh_token", response.data.refresh_token);
    //     this.props.history.push("/");
    //   }
    // });
    this.countDown();
  };
  countDown() {
    const { count } = this.state;
    if (count === 0) {
      this.setState({
        count: 10,
        liked: false
      });
    } else {
      this.setState({
        count: count - 1,
        liked: true
      }, () => {
        setTimeout(() => this.countDown(), 1000);
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const instance = axios.post(
      "http://192.168.3.3:8080/user-service/user/login",
      {
        principal: this.state.phoneNum,
        credentials: this.state.code,
        loginType: LoginType.VERIFY_CODE
      }
    );
    instance.then(response => {
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        this.props.history.push("/");
      }
    });
  };

  onPhoneNumChange = e => {
    this.setState({
      phoneNum: e.target.value
    });
  };

  onCodeChange = e => {
      this.setState({
          code: e.target.value
      })
  }

  render() {
    return (
      <div>
        <p className="littleTitle">手机号</p>
        <Input
          className="apiMobileInput"
          onChange={this.onPhoneNumChange}
          //   value={this.props.phoneNumber}
        />
        <p className="littleTitle">获取验证码</p>
        <Input
          className="apiInput"
          onChange={this.onCodeChange}
          addonAfter={
            <button
              disabled={!this.state.liked ? false : true}
              onClick={this.getCode}
              className="verificationCode"
            >
              {!this.state.liked ? "获取验证码" : `${this.state.count + 1}秒后重发`}
            </button>
          }
        />
        <Button
            type="primary"
            onClick={this.handleSubmit}
            style={{
              width: 350,
              height: 40,
              display: "block",
              borderRadius: 30,
              margin: "auto"
            }}
          >
            登录
          </Button>
      </div>
    );
  }
}

export default withRouter(LoginPhone)