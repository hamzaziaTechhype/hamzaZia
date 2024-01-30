import { Outlet, Navigate } from 'react-router-dom'

// const PrivateRoutes = () => {
//     const auth = { token: localStorage.getItem('token') };
//     // let auth = {'token': false}
//     return(
//         auth.token ? <Outlet/> : <Navigate to="/"/>
//     )
// }
const PrivateRoutes = () => {
    const auth = { token: localStorage.getItem('token') };

    return auth.token ? <Outlet /> : <Navigate to="/" />;
  };

export default PrivateRoutes