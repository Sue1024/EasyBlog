import React from "react";
import { Form, Icon, Input, Button, Checkbox, DatePicker, Radio } from "antd";
import axios from "axios";
import moment from "moment";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      birthdate: "",
      gender: "",
      email: ""
    };
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onBirthdateChange = this.onBirthdateChange.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this)
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value
    })
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

  onBirthdateChange(value) {
    this.setState({
      birthdate: value
    });
  }
  onGenderChange(e) {
    this.setState({
      gender: e.target.value
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const instance = axios.post(
          "http://192.168.3.3:8080/user-service/user/register",
          {
            username: this.state.username,
            password: this.state.password,
            gender: this.state.gender,
            email: this.state.email,
            birthDate: moment(this.state.birthdate).format("YYYY-MM-DD")
          }
        );
        instance.then(response => {
          if (response.status === 200) {
            this.props.registerCallback();
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };
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
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码"
              minLength={6}
              maxLength={10}
              onChange={this.onPasswordChange}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="邮箱"
              onChange={this.onEmailChange}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("date-picker", config)(
            <DatePicker
              placeholder="生日"
              style={{ width: "100%" }}
              onChange={this.onBirthdateChange}
            />
          )}
        </Form.Item>
        <Form.Item label="性别">
          <Radio.Group
            name="radiogroup"
            defaultValue={1}
            onChange={this.onGenderChange}
          >
            <Radio value="男性">男</Radio>
            <Radio value="女性">女</Radio>
            <Radio value="其他">其他</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
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
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegisterForm = Form.create({ name: "register" })(Register);
export default WrappedRegisterForm;
