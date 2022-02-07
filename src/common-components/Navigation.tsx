import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navigation: FC = () => {
  return (
    <Header
      className="flex items-center bg-white justify-between select-none"
      style={{ padding: '24px' }}
    >
      <Link
        to="/"
        className="text-xl font-medium flex items-center gap-3 text-white hover:text-white"
      >
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt="antd-logo"
          className="h-8 w-8"
        />
        <span className="text-white hover:text-white">SEFT SPA</span>
      </Link>

      <Link to="/login" className="flex items-center gap-1">
        <UserOutlined style={{ color: '#fff' }} />
        <span className="text-white hover:underline hover:text-white">
          Trung Dinh Vu (sign out)
        </span>
      </Link>
    </Header>
  );
};

export default Navigation;
