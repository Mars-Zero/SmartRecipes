import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../styles/SignUp.css'; // Import the updated CSS

const SignUpPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showAlert, setShowAlert] = useState(false);
    const [serverMessage, setServerMessage] = useState('');

    const onSubmit = (data) => {
        if (data.password === data.confirmPassword) {
            const userData = {
                username: data.username,
                email: data.email,
                password: data.password,
            };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            };

            fetch('/auth/signup', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setServerMessage(data.message || 'Registration Successful!');
                    setShowAlert(true);
                    reset();
                })
                .catch(err => {
                    console.error(err);
                    setServerMessage('Something went wrong. Please try again later.');
                    setShowAlert(true);
                });
        } else {
            alert('Passwords do not match!');
        }
    };

    return (
        <div className="hero-section">
            <div className="form-container">
                {showAlert && (
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        {serverMessage}
                    </Alert>
                )}

                <h2>Hai, fă foamea cu noi!</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Full Name Field */}
                    <Form.Group>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faUser} className="form-icon" />
                            <Form.Control
                                type="text"
                                placeholder="Full name"
                                {...register('username', { required: true })}
                            />
                        </div>
                        {errors.username && <small className="text-danger">Name is required.</small>}
                    </Form.Group>

                    {/* Telephone Field */}
                    <Form.Group>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faPhone} className="form-icon" />
                            <Form.Control
                                type="tel"
                                placeholder="Telephone"
                                {...register('telephone', { required: true })}
                            />
                        </div>
                        {errors.telephone && <small className="text-danger">Phone number is required.</small>}
                    </Form.Group>

                    {/* Email Field */}
                    <Form.Group>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
                            <Form.Control
                                type="email"
                                placeholder="E-mail"
                                {...register('email', { required: true })}
                            />
                        </div>
                        {errors.email && <small className="text-danger">Email is required.</small>}
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faLock} className="form-icon" />
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                {...register('password', { required: true })}
                            />
                        </div>
                        {errors.password && <small className="text-danger">Password is required.</small>}
                    </Form.Group>

                    {/* Confirm Password Field */}
                    <Form.Group>
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faLock} className="form-icon" />
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                {...register('confirmPassword', { required: true })}
                            />
                        </div>
                        {errors.confirmPassword && <small className="text-danger">Please confirm your password.</small>}
                    </Form.Group>

                    <Button type="submit">Sign up</Button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
