import { useState,useEffect } from 'react';
import {  Route, Routes, useNavigate  } from "react-router-dom";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    PlusSquareOutlined,
    UnorderedListOutlined
  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import UserManagement from './user-mng/UserManager';
import ListLesson from './lesson-bank/list-lesson';
import AddListening from './add-lesson/listening/add';
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
    useEffect(() => {
      if (window.localStorage["token"] === undefined) navigate("/login");
      let token = JSON.parse(window.localStorage["token"]);
      if (token["access-token"] === undefined
          || token["refresh-token"] === undefined
          || token["expired-at"] === undefined) navigate("/login");
  }, [navigate]);
    const items = [
        getItem('User Management', '1', <TeamOutlined />, null, () => navigate('/admin/user-management')),
        getItem('Lesson Bank', '2', <UnorderedListOutlined />, null, () => navigate('/admin/lesson-bank')),
        getItem('Add Lesson', 'sub1', <PlusSquareOutlined />, [
            getItem('Listening', '3', null, null,() => navigate('/admin/add-listening')),
            getItem('Reading', '4'),
            getItem('Vocabulary', '5'),
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
                    <Route path="/lesson-bank" element={<ListLesson/>} />
                    <Route path="/add-listening" element={<AddListening/>} />
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