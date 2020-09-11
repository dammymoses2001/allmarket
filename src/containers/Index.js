import React from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div>
      Get Started
      <Link to='/login'>
        <button>Login</button>
      </Link>
    </div>
  );
}
