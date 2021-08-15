import React from 'react';
import { CoverImage } from './styles';

/* Routes Library */
import { Link } from "react-router-dom"

function Login() {
    return (
        <div className="d-md-flex h-md-100 align-items-center">
            {/* Left Side */}
            <div className="col-md-6 p-0  h-md-100">
                <CoverImage className="d-md-flex align-items-center h-100 p-5 text-center justify-content-center"></CoverImage>
            </div>

            {/* Right Side */}
            <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
                <div className="align-items-center h-md-100 p-5 justify-content-center">
                    {/* Company Logo */}
                    <div className="brand">
                        <img alt="LOGO" />
                        LOGO
                    </div>

                    {/* Title Form */}
                    <p className="text-center">Sign into your account</p>

                    {/* Register Form */}
                    <form>
                        <div className="row g-3 mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                        </div>
                        <button type="submit" className="btn btn-dark w-100 d-grid mx-auto">
                            Login
                        </button>
                    </form>
                    <Link to="/register">Don't have an account? Register here</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;