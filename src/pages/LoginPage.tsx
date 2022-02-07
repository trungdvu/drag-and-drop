import React, { FC } from 'react';
import { Button, Form, Input, Layout } from 'antd';
import { Link } from 'react-router-dom';

const LoginPage: FC = () => {
  const onFinish = (values: any) => {
    console.log('Success :>> ', values);
  };

  return (
    <Layout className="p-5 rounded mx-auto mt-20 max-w-sm">
      <Form
        name="login"
        layout="vertical"
        onFinish={onFinish}
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
          <Button type="primary" htmlType="submit" className="mt-2 w-full">
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

export default LoginPage;
