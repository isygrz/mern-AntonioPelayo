import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/redux';
import { useSearchParams } from 'react-router-dom';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('personal');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ email, name, password, role })).unwrap();
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label>Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} required />
      <label>Email:</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password:</label>
      <input
        type={show ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>
        <input type="checkbox" checked={show} onChange={() => setShow(!show)} />
        Show password
      </label>
      <label>Account Type:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="personal">Personal</option>
        <option value="vendor">Vendor</option>
      </select>
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterScreen;
