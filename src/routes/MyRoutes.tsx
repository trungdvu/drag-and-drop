import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import MyLayout from '../common-components/MyLayout';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';

const MyRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MyLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default MyRoutes;
