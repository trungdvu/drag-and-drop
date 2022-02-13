import React from 'react';
import IdleTimer from 'react-idle-timer';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import SessionExpiredModal from './common-components/SessionExpiredModal';
import MyRoutes from './routes/MyRoutes';
import { TDispatch, TRootState } from './store';
import moment from 'moment';

const DEFAULT_SESSION_TIME_OUT = 1800000;

const getExpiredMiniseconds = (exp: any) => {
  const expDate = moment(exp * 1000);
  const now = moment();
  return expDate.diff(now);
};

type TAppProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const App: React.FC<TAppProps> = (props) => {
  const sessionTimeOut = React.useRef(DEFAULT_SESSION_TIME_OUT);
  const [isIdleExpired, setIsIdleExpired] = React.useState(false);
  const idleTimer = React.useRef<IdleTimer>();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (auth && auth.currentUser) {
      sessionTimeOut.current = getExpiredMiniseconds(auth.currentUser.exp);
      props.setCurrentUser(auth.currentUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!props.currentUser && !location.pathname.includes('/signup')) {
      navigate('/login');
    }
  }, [location.pathname, navigate, props.currentUser]);

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
    await props.doSignOut();
  };

  return (
    <>
      <IdleTimer
        ref={setIdleRef}
        timeout={sessionTimeOut.current}
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
