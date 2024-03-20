import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
const apiKey = import.meta.env.VITE_REACT_APP_BACKEND;

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            checkToken();
        }
    }, []);

    async function checkToken() {
        if (!token) {
            setIsAuthorized(false);
            return;
        }
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    
        try {
            const response = await axios.post(`${apiKey}/verify`, {}, { headers });
            
            if (response.data.success) {
                window.location.href = '/create'; 
            } else {
                
            }
        } catch (error) {
            console.error('Error verifying token:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiKey}/login`, { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            
            window.location.href = '/create';
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <section className="login">
                <div className="container-fluid vh-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample image"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
