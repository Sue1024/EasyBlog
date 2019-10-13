import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import axios from "axios";

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const instance = axios.post(
          "http://192.168.3.2:8082/user-service/user/login",
          {
            username: "sue",
            password: "091001"
          }
        );
        instance.then(response=>{
          console.log(response)
          if(response.status===200) {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
          }

          const instance3 = axios.get(
            "http://192.168.3.2:8082/user-service/user-management/all",
            {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}` 
              }
            }
          );
  
          instance3.then(response => {
            console.log(response)
          })
        })
        const instance2 = axios.post(
          "http://192.168.3.2:8082/user-service/user/register",
          {
            username: "sue",
            password: "091001"
          }
        );
        instance2.then(response=>{
          console.log(response)
        })

        
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
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>记住我</Checkbox>)}
          <a style={{float: "right"}} href="">
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

const WrappedLoginForm = Form.create({ name: "login" })(Login);
export default WrappedLoginForm;
