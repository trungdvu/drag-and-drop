import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './Navigation';

const { Content } = Layout;

const MyLayout: FC = () => {
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
