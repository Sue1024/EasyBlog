import React from "react";
import { withRouter } from "react-router";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import axios from "axios";
class LoginType {
  static USER_NAME = "username";
  static PHONE_NUM = "phone_num";
  static EMAIL = "email";
}
class LoginUserName extends React.Component {
  constructor(props) {
    super(props);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUserNameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const instance = axios.post(
          "http://192.168.3.3:8080/user-service/user/login",
          {
            principal: this.state.username,
            credentials: this.state.password,
            loginType: LoginType.USER_NAME
          }
        );
        instance.then(response => {
          if (response.status === 200) {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            this.props.history.push("/");
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="用户名"
              onChange={this.onUserNameChange}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码"
              onChange={this.onPasswordChange}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>记住我</Checkbox>)}
          <a style={{ float: "right" }} href="">
            登录遇到问题？
          </a>
          <Button
            type="primary"
            htmlType="submit"
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
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "login" })(LoginUserName);
export default withRouter(WrappedLoginForm);
