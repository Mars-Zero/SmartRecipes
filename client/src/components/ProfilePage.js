import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/ProfilePage.css'; // Add custom styles
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img src="/logo_mic.png" className="logo" alt="Logo" />
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="/recipes">
                  Recipes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/add_recipe">
                  Add Recipe
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
              <Link to="/"  style={{ textDecoration: 'none' }}>
                     
                     <button
                         className="btn btn-link nav-link active"
                         style={{ color: 'white', textDecoration: 'none' }}
                     >
                         Log Out
                     </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="profile-content">
        <div className="profile-info">
          <div className="chef-icon">
            <i className="fas fa-user-chef"></i>
            <p>Gogu bucatar</p>
          </div>
        </div>
        <div className="contact-info">
          <Form>
            <Form.Group controlId="email">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="telephone">
              <Form.Label>Telephone:</Form.Label>
              <Form.Control type="text" placeholder="Enter telephone" />
            </Form.Group>
            <Form.Group controlId="collegeGroup">
              <Form.Label>College group:</Form.Label>
              <Form.Control type="text" placeholder="Enter college group" />
            </Form.Group>
            <Link className="nav-link active" to="/create_recipe">Create Recipes</Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;