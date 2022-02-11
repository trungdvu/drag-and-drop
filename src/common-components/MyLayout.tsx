import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const { Content } = Layout;

const MyLayout: React.FC = () => {
  return (
    <Layout style={{ height: 'auto' }}>
      <Navigation />
      <Content className="p-6">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MyLayout;
