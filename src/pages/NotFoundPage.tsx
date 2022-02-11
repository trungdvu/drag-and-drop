import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <p>Page Not Found</p>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
