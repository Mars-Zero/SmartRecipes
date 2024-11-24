import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../auth';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';


const LoginPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const history = useHistory();

    const loginUser = (data) => {
        console.log(data);

        const requestOptions = {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch('/auth/login', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data.access_token);

                if (data) {
                    login(data.access_token);
                    history.push('/');
                } else {
                    alert('Invalid username or password');
                }
            });

        reset();
    };

    return (
        <div className="hero-section">
            <div className="form-container">
                <h2>Loghează-te, chiorăie mațele!</h2>
                <form onSubmit={handleSubmit(loginUser)}>
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
                        {errors.username && <small className="text-danger">E-mail is required.</small>}
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

                    {/* Submit Button */}
                    <Button type="submit" className="login-button">
                        Log in
                    </Button>

                    {/* Forgot Password Link */}
                    <div className="forgot-password">
                        <Link 
                        style={{
                            color: 'white',
                            textDecoration: 'underline',
                        }}
                        to="/forgot-password">Forgot password?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
