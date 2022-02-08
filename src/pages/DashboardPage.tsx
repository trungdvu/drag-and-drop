import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch, RootState } from '../store';

type DashboardPageProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const DashboardPage: FC<DashboardPageProps> = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.currentUser) {
      navigate('/login');
    }
  }, [navigate, props.currentUser]);

  return <div>This is Dashboard Page</div>;
};

const mapState = (state: RootState) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatch = (dispatch: Dispatch) => ({
  doLogin: dispatch.auth.doLogin,
});

export default connect(mapState, mapDispatch)(DashboardPage);
