import React from "react";
import { Card } from 'antd';
import Login from './login'

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: 'login',
    };
  }

  onTabChange = (key, type) => {
    this.setState({ activeTabKey: key });
  };

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
    let map = {
      "login": <Login></Login>,
      "register": <Login></Login>
    }
    return (
      
      <div style={{ width: '100vw', height: '100vh', background: '#f1f1f1', display: 'flex' }}>
        <Card
          style={{ width: 400, height: 600, margin: 'auto' }}
          tabList={tabList}
          activeTabKey={this.state.activeTabKey}
          onTabChange={key => {
            this.onTabChange(key);
          }}
        >
          <Login></Login>
        </Card>
      </div>
    );
  }
}
