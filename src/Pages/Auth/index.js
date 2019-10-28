import React from "react";
import { withRouter } from "react-router";
import { Card } from "antd";
import Register from "./register";
import Login from "./login";

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: "login"
    };
  }

  onTabChange = (key, type) => {
    if (key === "login") {
      this.props.history.push("/auth/sign_in");
    } else {
      this.props.history.push("/auth/sign_up");
    }
    this.setState({
        activeTabKey: key
    })
  };

  componentDidMount() {
    if (this.state.activeTabKey === "login") {
        this.props.history.push("/auth/sign_in");
      } else {
        this.props.history.push("/auth/sign_up");
      }
  }

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
          activeTabKey={this.state.activeTabKey}
          onTabChange={key => {
            this.onTabChange(key);
          }}
        >
          {this.props.children}
        </Card>
      </div>
    );
  }
}

// export default withRouter(RegisterPage);
