import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Main = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            user: "null",
            token: "",
            refreshToken: "",
        })
        localStorage.removeItem('auth');
        toast.success('Logout Success')

    }
    const loggedIn = auth.user !== null && auth.token !== '' && auth.refreshToken !== '';
    const handlePostAdClick = ()=>{
        if(loggedIn){
         navigate('/ad/create')
        }else{
        navigate('/login')
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to={'/'}>DwellSpace </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-link m-2" aria-current="page" to={'/'}>Home</NavLink>
                            <NavLink to={'/dashboard'} className="nav-link pointer m-2" onClick={handlePostAdClick}>Dashboard</NavLink>
                            {!loggedIn ? <>
                                <NavLink className="nav-link m-2" to={'/login'}>Login</NavLink>
                                <NavLink className="nav-link m-2" to={'/register'}>Register</NavLink>
                            </>
                                : ''}
                            {/* <NavLink className="nav-NavLink disabled" aria-disabled="true">Disabled</NavLink> */}
                        </div>
                    </div>
                    
                   { loggedIn ?  <div className="dropdown">
                        <li>
                            <NavLink className='nav-link dropdown-toggle' data-bs-toggle='dropdown'>
                                {auth.token ? auth.user.email : 'User'}
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li>
                                    <NavLink className="nav-link" to={'/dashboard'}>Dashboard</NavLink>
                                </li>
                                <li>
                                    <button className='btn btn-primary nav-link' onClick={handleLogout}  >Logout</button>
                                </li>
                            </ul>
                        </li>
                    </div>

                    : ''}
                </div>

            </nav>


        </>
    )
}

export default Main;