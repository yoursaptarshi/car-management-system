import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, clearErrors } from '../../Actions/userAction';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, message } = useSelector((state) => state.user);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ UserName: userName, Password: password }));
  };

  // Clear errors on page load or before unmount
  React.useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  // Redirect if authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      alert(message || 'Login Successful!');
      navigate('/'); 
    }
  }, [isAuthenticated, message, navigate]);

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} style={{ padding: '10px', background: '#007BFF', color: '#fff' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
