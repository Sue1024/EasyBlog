import React from "react";
import { Menu, Dropdown, Button } from "antd";
import "./index.css";
export default class Header extends React.Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        <div className="logo">Easy Blog</div>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button>bottomLeft</Button>
        </Dropdown>
      </div>
    );
  }
}
