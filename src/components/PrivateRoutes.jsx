import React from 'react';
import { Outlet, useHistory,useNavigate } from 'react-router-dom';
import Header from './Header';

const PrivateRoutes = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    destroyToken();
    navigate('/');
  };
  const destroyToken = () => {
    localStorage.removeItem('token');
  };
  return (
    <>
      <div>PrivateRoutes</div>
      <button className='btn btn-danger p-3 mt-2 mb-2' onClick={handleLogout}>
        Logout
      </button>
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
