import React from 'react';
import IdleTimer from 'react-idle-timer';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import SessionExpiredModal from './common-components/SessionExpiredModal';
import MyRoutes from './routes/MyRoutes';
import { TDispatch, TRootState } from './store';

const SESSION_TIME_OUT = 1800000;

type TAppProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const App: React.FC<TAppProps> = (props) => {
  const [isIdleExpired, setIsIdleExpired] = React.useState(false);
  const idleTimer = React.useRef<IdleTimer>();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (auth && auth.currentUser) {
      props.setCurrentUser(auth.currentUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!props.currentUser) {
      navigate('/login');
    }
  }, [navigate, props.currentUser]);

  const setIdleRef = (ref: IdleTimer) => {
    idleTimer.current = ref;
  };

  const _handleOnIdle = () => {
    if (
      !location.pathname.includes('/login') &&
      !location.pathname.includes('/signup')
    ) {
      setIsIdleExpired(true);
    }
  };

  const hanldeSessionExpiredModalClose = async () => {
    setIsIdleExpired(false);
    await props.doSignOut(undefined);
  };

  return (
    <>
      <IdleTimer
        ref={setIdleRef}
        timeout={SESSION_TIME_OUT}
        onIdle={_handleOnIdle}
        throttle={2000}
      />
      <SessionExpiredModal
        visible={isIdleExpired}
        onOk={hanldeSessionExpiredModalClose}
        onCancel={hanldeSessionExpiredModalClose}
      />
      <MyRoutes />
    </>
  );
};

const mapState = (state: TRootState) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatch = (dispatch: TDispatch) => ({
  setCurrentUser: dispatch.auth.setCurrentUser,
  doSignOut: dispatch.auth.doSignOut,
});

export default connect(mapState, mapDispatch)(App);
