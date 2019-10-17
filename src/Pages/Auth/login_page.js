import React from "react";
import { withRouter } from "react-router"
import { Card } from "antd";
import Login from "./login";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: "login"
    };
  }

  onTabChange = (key, type) => {
    if (key === "register") {
      this.props.history.push('/sign_up')
    }
  };

  render() {
    const tabList = [
      {
        key: "login",
        tab: "登录"
      },
      {
        key: "register",
        tab: "注册"
      }
    ];
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#f1f1f1",
          display: "flex"
        }}
      >
        <Card
          style={{ width: 400, height: 600, margin: "auto" }}
          tabList={tabList}
          activeTabKey="login"
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

export default withRouter(LoginPage)
