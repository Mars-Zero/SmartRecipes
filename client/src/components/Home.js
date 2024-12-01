import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { Form, Button } from 'react-bootstrap';
import '../styles/Home.css'; // Import the updated CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
    const [logged] = useAuth();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('/recipe/recipes')
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data.slice(0, 3)); // Show top 3 recipes
            })
            .catch((err) => console.log(err));
    }, []);

    const featuredRecipe = recipes[0];
    
    return (
        <div className="home-page">
            <header className="hero-section">
                <div className="hero-logo">
                    {featuredRecipe ? (
                        <img
                            src={featuredRecipe.image || '/logo_mare.png'} // Placeholder image
                            alt={featuredRecipe.title}
                            className="recipe-image"
                        />
                    ) : (
                        <img
                            src="/logo_mare.png" // Default image when no recipe is available
                            alt="Default"
                            className="recipe-image"
                        />
                    )}
                </div>
            </header>

            <section className="recipes-section">
                <h2>Top Rated Recipes</h2>
                <div className="recipes-grid">
                    {recipes.map((recipe, index) => (
                        <div className="recipe-card" key={index}>
                            <img
                                src={recipe.image || '/default-photo.png'} // Placeholder image
                                alt={recipe.title}
                                className="recipe-image"
                            />
                            <h3>{recipe.title}</h3>
                            <img
                                src= './default_photo.png' 
                                alt={featuredRecipe.title}
                                className="recipe-image"
                            />
                            <p>Author: {recipe.author}</p>
                            <p>Rating: ⭐⭐⭐⭐☆</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="contact-section">
                <h2>Contact Us</h2>
                <Form className="contact-form">
                    <Form.Group controlId="firstName" className="form-group-with-icon">
                        <i className="fas fa-user"></i>
                        <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group controlId="lastName" className="form-group-with-icon">
                        <i className="fas fa-user"></i>
                        <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group controlId="email" className="form-group-with-icon">
                        <i className="fas fa-envelope"></i>
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group controlId="message" className="form-group-with-icon">
                        <i className="fas fa-comment"></i>
                        <Form.Control as="textarea" rows={3} placeholder="Message" />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Form>
            </section>

            <footer className="footer">
                <div className="social-links">
                    <a href="#" aria-label="Facebook">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" aria-label="YouTube">
                        <i className="fab fa-youtube"></i>
                    </a>
                    <a href="#" aria-label="Twitch">
                        <i className="fab fa-twitch"></i>
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
