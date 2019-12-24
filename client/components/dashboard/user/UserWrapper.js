import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Avatar, Button, Steps } from "antd";
const { Step } = Steps;
import { userLogOut } from "../../../actions/users";

const { Header, Sider, Content } = Layout;

function UserWrapper(props) {
  const [broken, setBroken] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = () => {
    props.userLogOut(() => props.history.push("/"));
  };

  const stepStyle = {
    marginBottom: 10,
    boxShadow: "0px -1px 0 0 #e8e8e8 inset"
  };
  const { user } = props;
  return (
    <Layout className="wrapper">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh"
        }}
        breakpoint="sm"
        onBreakpoint={broken => {
          setBroken(broken);
        }}
        trigger={null}
        collapsible
        collapsedWidth={broken ? "0" : "80"}
        collapsed={collapsed}
      >
        <div className="logo"> Alt Campus </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[props.activeKey]}
        >
          <Menu.Item key="0">
            <Link to="/">
              <Icon type="paper-clip" />
              <span> Instructions </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/task/1">
              <Icon type="html5" />
              <span>
                <span>HTML / CSS</span>{" "}
                {user.stage > 1 ? (
                  <Icon
                    type="check-circle"
                    theme="filled"
                    className="menu-icon"
                  />
                ) : (
                  ""
                )}
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" disabled={user.stage < 2 ? true : false}>
            <Link to="/task/2">
              <Icon type="code" />
              <span> CodeWars </span>
              {user.stage > 2 ? (
                <Icon
                  type="check-circle"
                  theme="filled"
                  className="menu-icon"
                />
              ) : (
                ""
              )}
            </Link>
          </Menu.Item>
          <Menu.Item key="3" disabled={user.stage < 3 ? true : false}>
            <Link to="/task/3">
              <Icon type="question" />
              <span> Q / A </span>
              {user.stage > 3 ? (
                <Icon
                  type="check-circle"
                  theme="filled"
                  className="menu-icon"
                />
              ) : (
                ""
              )}
            </Link>
          </Menu.Item>
          <Menu.Item key="4" disabled={user.stage < 4 ? true : false}>
            <Link to="/task/4">
              <Icon type="video-camera" />
              <span> Interview </span>
              {user.stage > 4 ? (
                <Icon
                  type="check-circle"
                  theme="filled"
                  className="menu-icon"
                />
              ) : (
                ""
              )}
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/profile">
              <Icon type="user" />
              <span> Your Profile </span>
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
          <div
            style={{
              marginRight: "20px"
            }}
          >
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              size={50}
              style={{
                marginRight: "6px"
              }}
            />
            <Button
              onClick={handleClick}
              title="Logout"
              type="danger"
              shape="circle"
              icon="logout"
            />
          </div>
        </Header>
        <Steps
          type="navigation"
          current={Number(props.activeKey) - 1}
          style={stepStyle}
          onChange={index =>
            console.log(index) || props.history.push(`/task/${index + 1}`)
          }
        >
          <Step
            status={
              Number(user.stage) === 1
                ? "process"
                : Number(user.stage) < 1
                ? "wait"
                : "finish"
            }
            title="HTML"
          />
          <Step
            status={
              Number(user.stage) === 2
                ? "process"
                : Number(user.stage) < 2
                ? "wait"
                : "finish"
            }
            title="CodeWars"
          />
          <Step
            status={
              Number(user.stage) === 3
                ? "process"
                : Number(user.stage) < 3
                ? "wait"
                : "finish"
            }
            title="Quiz"
          />
          <Step
            status={
              Number(user.stage) === 4
                ? "process"
                : Number(user.stage) < 4
                ? "wait"
                : "finish"
            }
            title="Interview"
          />
        </Steps>
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
              textAlign: "left"
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
  connect(mapStateToProps, { userLogOut })(UserWrapper)
);
