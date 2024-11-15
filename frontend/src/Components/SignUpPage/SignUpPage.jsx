import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister, clearErrors } from '../../Actions/userAction';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, message } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    dispatch(userRegister({ Name: name, UserName: userName, Password: password }));
  };

  // Clear errors on page load or before unmount
  React.useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  // Redirect or success message
  React.useEffect(() => {
    if (isAuthenticated) {
      alert('Successfully registered!');
    }
  }, [isAuthenticated]);

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Email"
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} style={{ padding: '10px', background: '#007BFF', color: '#fff' }}>
          {loading ? 'Registering...' : 'Sign Up'}
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default SignUpPage;
