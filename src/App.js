import './App.css';
import Header from './components/Header';
import { Router,Route,Routes,BrowserRouter } from 'react-router-dom';
// import PrivateRoutes from './routes/userRoutes';
import Login from "./pages/login";
import Post from "./pages/post";
import PrivateRoutes from './components/PrivateRoutes';
import Ragister from "./pages/sigup";
import Forgot from "./pages/forgot";
import VerifyAccount from './pages/verifyAccount';
function App() {
  return (
    <>
{/* <Header/>/ */}
<BrowserRouter>
<Routes>
          {/* <Routes> */}
            <Route path="/hamza" element={<PrivateRoutes />}>
                <Route path="post" element={<Post/>}  />
            </Route>
            <Route element={<Login/>} path="/"/>
            <Route element={<Ragister/>} path="/ragister"/>
            <Route element={<Forgot/>} path="/forgot-password"/>
            <Route element={<VerifyAccount/>} path="/Verifyaccount"/>
          {/* </Routes> */}
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
