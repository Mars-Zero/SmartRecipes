import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../auth';
import '../styles/NavBar.css'; // Create a CSS file for custom styling

const LoggedInLinks = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/create_recipe">Create Recipes</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link active" href="#" onClick={() => { logout(); }}>Log Out</a>
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

const NavBar = () => {
    const [logged] = useAuth();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark custom-navbar"> {/* Use custom CSS for darker blue */}
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <h1>chef<span className="brand-highlight">IT</span></h1>
                    </div>
                    <Link className="navbar-brand" to="/">Recipes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {logged ? <LoggedInLinks /> : null} {/* Show left-side links */}
                        </ul>
                        <ul className="navbar-nav ms-auto"> {/* Align right-side links */}
                            {!logged ? <LoggedOutLinks /> : null}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;