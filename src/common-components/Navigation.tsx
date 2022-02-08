import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../store';

const { Header } = Layout;

type TNavigationProps = ReturnType<typeof mapDispatch> &
  ReturnType<typeof mapState>;

const Navigation: FC<TNavigationProps> = (props) => {
  return (
    <Header
      className="flex items-center justify-between bg-white select-none"
      style={{ padding: '24px' }}
    >
      <Link
        to="/"
        className="flex items-center gap-3 text-xl font-medium text-white hover:text-white"
      >
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt="antd-logo"
          className="w-8 h-8"
        />
        <span className="text-white hover:text-white">SEFT SPA</span>
      </Link>

      <Link to="/login" className="flex items-center gap-1">
        <UserOutlined style={{ color: '#fff' }} />
        <span className="text-white hover:underline hover:text-white">
          {props.currentUser?.username} (sign out)
        </span>
      </Link>
    </Header>
  );
};

const mapState = (state: RootState) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatch = (dispatch: Dispatch) => ({});

export default connect(mapState, mapDispatch)(Navigation);
