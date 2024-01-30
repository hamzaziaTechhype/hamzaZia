import React from 'react'
import { NavLink,Link,Navigate,Outlet} from 'react-router-dom'
const Header = () => {
  return (
   <>
<nav className="navbar navbar-expand-lg bg-secondary ">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Logo</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <NavLink to="/post">
        <li className="nav-item">
          <a className="nav-link">Post's</a>
        </li>
        </NavLink>
        <li className="nav-item">
          <a className="nav-link" href="#">Other</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<Outlet />


   </>
  )
}

export default Header