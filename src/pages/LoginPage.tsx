import React, { FC, useEffect } from 'react';
import { Button, Form, Input, Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Dispatch, RootState } from '../store';
import { connect } from 'react-redux';

type LoginPageProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const LoginPage: FC<LoginPageProps> = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.currentUser) {
      navigate('/');
    }
  }, [navigate, props.currentUser]);

  const _onFinish = (values: any) => {
    props.doLogin(values);
  };

  return (
    <Layout className="max-w-sm p-5 mx-auto mt-20 rounded">
      <Form
        name="login"
        layout="vertical"
        onFinish={_onFinish}
        autoComplete="off"
      >
        <p className="text-2xl text-center">
          Login to <span className="font-medium">SEFT SPA</span>
        </p>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full mt-2">
            Login
          </Button>
        </Form.Item>

        <Form.Item>
          <Link
            to={'/signup'}
            className="text-black hover:text-black hover:underline"
          >
            New to <span className="font-medium">SEFT SPA</span>? Sign up now.
          </Link>
        </Form.Item>
      </Form>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatch = (dispatch: Dispatch) => ({
  doLogin: dispatch.auth.doLogin,
});

export default connect(mapState, mapDispatch)(LoginPage);
