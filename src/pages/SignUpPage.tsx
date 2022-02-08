import React, { FC, useEffect } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Dispatch, RootState } from '../store';
import { connect } from 'react-redux';

type SignUpPageProps = ReturnType<typeof mapDispatch> &
  ReturnType<typeof mapState>;

const SignUpPage: FC<SignUpPageProps> = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.currentUser) {
      navigate('/');
    }
  }, [navigate, props.currentUser]);

  const _onFinish = async (values: any) => {
    await props.doSignUp(values);
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
          Create a account on <span className="font-medium">SEFT SPA</span>
        </p>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="New password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Name" name="fullName">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full mt-2">
            Sign up
          </Button>
        </Form.Item>

        <Form.Item>
          <Link
            to={'/login'}
            className="text-black hover:text-black hover:underline"
          >
            Already have an account? Login now.
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
  doSignUp: dispatch.auth.doSignUp,
});

export default connect(mapState, mapDispatch)(SignUpPage);
