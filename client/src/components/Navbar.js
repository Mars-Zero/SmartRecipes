import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../auth';
import '../styles/NavBar.css'; // Ensure your custom CSS file is linked correctly

const LoggedInLinks = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/create_recipe">Create Recipes</Link>
            </li>
        </>
    );
};

const LoggedOutLinks = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/signup">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/login">Login</Link>
            </li>
        </>
    );
};

const LogoutButton = () => {
    return (
        <li className="nav-item ms-auto"> {/* Ensure right alignment */}
            <button
                className="btn btn-link nav-link active"
                onClick={() => { logout(); }}
                style={{ color: 'white', textDecoration: 'none' }}
            >
                Log Out
            </button>
        </li>
    );
};

const NavBar = () => {
    const [logged] = useAuth();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
                <div className="container-fluid">
                    {/* Logo Section */}
                    <div className="navbar-brand">
                        <img
                            src={'/logo_mic.png'}
                            className="logo"
                            alt="Logo"
                        />
                    </div>

                    {/* Navbar Brand */}
                    <Link className="navbar-brand" to="/">Recipes</Link>
                    {/* <Link className="navbar-brand" to="/create_recipe">Add recipe</Link> */}

                    {/* Navbar Toggler for mobile view */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Navbar */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* Left Links */}
                        <ul className="navbar-nav">
                            {logged ? <LoggedInLinks /> : null}
                        </ul>

                        {/* Right Links */}
                        <ul className="navbar-nav ms-auto">
                            {!logged ? <LoggedOutLinks /> : null}
                            {logged ? <LogoutButton /> : null}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
