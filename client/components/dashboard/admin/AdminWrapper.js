import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Avatar, Button, Anchor } from "antd";
import { userLogOut } from "../../../actions/users";

const { Header, Sider, Content } = Layout;

function AdminWrapper(props) {
  const [broken, setBroken] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = () => {
    props.userLogOut(() => props.history.push("/"));
  };

  return (
    <Layout className="wrapper">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh"
        }}
        breakpoint="sm"
        onBreakpoint={broken => {
          setCollapsed(broken);
          setBroken(broken);
        }}
        collapsible
        collapsedWidth={broken ? "0" : "80"}
        collapsed={collapsed}
      >
        <div className="logo"> AltCampus </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[props.activeKey]}
        >
          <Menu.Item key="0">
            <Link to="/">
              <Icon type="paper-clip" />
              <span> Applicants </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/questions">
              <Icon type="html5" />
              <span> Question </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/interviews/slots">
              <Icon type="code" />
              <span> Interview Slots </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/interviews/scheduled">
              <Icon type="code" />
              <span> Interview List </span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      {/* Display container */}
      <Layout
        style={{
          borderRadius: "10px"
        }}
      >
        {/* Header  */}
        <Header
          style={{
            background: "#fff",
            padding: "0",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Icon
            className="trigger"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={toggle}
            style={{
              padding: "16px"
            }}
          />
          <div>
            <span className="profile-name"> Howdy, {props.user.name}</span>
            <Button
              className="button-logout"
              onClick={handleClick}
              title="Logout"
              type="danger"
              icon="logout"
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial"
          }}
        >
          <div
            style={{
              padding: 24,
              background: "#fff",
              textAlign: "left",
              marginBottom: "1rem"
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => {
  const { user } = state.currentUser;
  return {
    user
  };
};

export default withRouter(
  connect(mapStateToProps, { userLogOut })(AdminWrapper)
);
