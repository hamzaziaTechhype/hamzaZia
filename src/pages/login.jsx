import React from 'react';
import { useState } from 'react';
import { Link, NavLink,Navigate, useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch('http://localhost:3001/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate('/hamza/post');
        console.log('Account verified successfully');
      } else {
        console.error('Account verification failed');
      }
    } catch (error) {
      console.error('Error during account verification:', error);
    }
  };
  return (
   <>
<div className="wrapper-login">
  <div className="inner">
    <form action>
      <h3 className='text-white text-center'>Singin</h3>
      <div className="form-holder">
        <span className="lnr lnr-user" />
        <input
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         type="text" className="form-control mb-3" placeholder="Username" />
      </div>
      <div className="form-holder">
        <span className="lnr lnr-lock" />
        <input
         value={password}
          onChange={(e) => setPassword(e.target.value)}
         type="password" className="form-control mb-3" placeholder="Confirm Password" />
      </div>
      <button type='submit' onClick={handleSubmit} className='btn-login me-2 btn text-white'>
        Login
      </button>
      <NavLink to="/ragister">
      <button  className='btn-login bg-success me-2 btn text-white'>
        Singup
      </button>
      </NavLink>
      <NavLink to="/forgot-password">
      <button className='btn-login btn text-white bg-danger'>
        Forgot Password
      </button>
      </NavLink>
      <NavLink to="/Verifyaccount ">
      <button className='btn-login ms-2 btn text-white'>
        Verify Account
      </button>
      </NavLink>
    </form>
  </div>
</div>
   </>
  )
}

export default Login