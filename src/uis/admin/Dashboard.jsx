import { useState } from 'react';
import {  Route, Routes, useNavigate  } from "react-router-dom";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import UserManagement from './UserManager';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children,onClick) {
    return {
      key,
      icon,
      children,
      label,
      onClick
    };
}

  
export default function DashboardForAdmin(){
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const items = [
        getItem('User Management', '1', <TeamOutlined />, null, () => navigate('/admin/user-management')),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
    ];
    return (
        <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" style={{marginBottom:"20px", overflow:"hidden"}}>
            <img src={process.env.PUBLIC_URL + 'logo.png'} style={{ height:"50px", width:"200px"}}/>
          </div>
          <Menu theme="dark"  mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: '16px 16px',
            }}
          >
            <div
              style={{
                padding: 24,
                height: '100%',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
                <Routes>
                    <Route path="/user-management" element={<UserManagement/>} />
                    
                </Routes>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Web Tool ©2023 for Admin
          </Footer>
        </Layout>
      </Layout>
    )
}