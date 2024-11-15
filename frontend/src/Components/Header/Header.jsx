import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../Actions/userAction';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Clear errors if any
  const handleClearErrors = () => {
    dispatch(clearErrors());
  };

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#282c34',
        color: 'white',
        maxHeight:'20vh'
      }}
    >
      {/* Site Title */}
      <h1>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Car Management System
        </Link>
      </h1>

      {/* Conditional Buttons */}
      <nav>
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              style={{
                margin: '0 10px',
                textDecoration: 'none',
                color: '#61dafb',
              }}
              onClick={handleClearErrors}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                margin: '0 10px',
                textDecoration: 'none',
                color: '#61dafb',
              }}
              onClick={handleClearErrors}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
          {console.log(user)}
            <span style={{ marginRight: '20px' }}>
              Welcome, {user?.name || 'User'}!
            </span>
            <Link
              to="/create-car"
              style={{
                margin: '0 10px',
                textDecoration: 'none',
                color: '#61dafb',
              }}
            >
              Create a Car
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
