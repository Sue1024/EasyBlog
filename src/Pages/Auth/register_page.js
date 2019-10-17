import React from "react";
import { withRouter } from "react-router"
import { Card } from 'antd';
import Register from './register'

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: 'login',
    };
    this.registerSuccess = this.registerSuccess.bind(this)
  }

  onTabChange = (key, type) => {
    if(key === 'login') {
      this.props.history.push("/sign_in")
    }
  };

  registerSuccess() {
    this.props.history.push("/sign_in")
  }

  render() {
    const tabList = [
      {
        key: 'login',
        tab: '登录',
      },
      {
        key: 'register',
        tab: '注册',
      },
    ];
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#f1f1f1', display: 'flex' }}>
        <Card
          style={{ width: 400, height: 600, margin: 'auto' }}
          tabList={tabList}
          activeTabKey="register"
          onTabChange={key => {
            this.onTabChange(key);
          }}
        >
          <Register registerCallback={this.registerSuccess}></Register>
        </Card>
      </div>
    );
  }
}

export default withRouter(RegisterPage)