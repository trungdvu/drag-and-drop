import { UserOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TDispatch, TRootState } from '../store';
import AddDashboardModal from './AddDashboardModal';

const { Header } = Layout;

type TNavigationProps = ReturnType<typeof mapDispatch> &
  ReturnType<typeof mapState>;

const Navigation: React.FC<TNavigationProps> = (props) => {
  const [isAddDashboardModalOpen, setIsAddDashboardModalOpen] =
    React.useState(false);

  const _handleAddDashboardModalOpen = () => {
    setIsAddDashboardModalOpen(true);
  };

  const _handleAddDashboardModalCancel = () => {
    setIsAddDashboardModalOpen(false);
  };

  return (
    <>
      <AddDashboardModal
        visible={isAddDashboardModalOpen}
        onClose={_handleAddDashboardModalCancel}
      />
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
        <div className="flex items-center gap-5">
          <Button type="primary" onClick={_handleAddDashboardModalOpen}>
            + Add new dasboard
          </Button>

          <Link to="/login" className="flex items-center gap-1 font-medium">
            <UserOutlined style={{ color: '#fff' }} />
            <span
              onClick={() => props.doSignOut()}
              className="text-white hover:underline hover:text-white"
            >
              {props.currentUser?.user} (sign out)
            </span>
          </Link>
        </div>
      </Header>
    </>
  );
};

const mapState = (state: TRootState) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatch = (dispatch: TDispatch) => ({
  doSignOut: dispatch.auth.doSignOut,
});

export default connect(mapState, mapDispatch)(Navigation);
