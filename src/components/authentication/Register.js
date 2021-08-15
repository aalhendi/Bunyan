import React from "react";
import authStore from "../../stores/authStore"
import { observer } from "mobx-react";


import { Redirect } from 'react-router-dom';


/* Styles */
import { CoverImage } from "./styles";

function Register() {
    /* Submit handler */
    const handleSubmit = () => {
        /* for testing */
        authStore.user = true
    }
    if (authStore.user) return <Redirect to="/products" />;
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
                    <p className="text-center">Create An Account</p>

                    {/* Register Form */}
                    <form onSubmit={handleSubmit}>
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
                                autoComplete="password"
                            />
                        </div>
                        <button type="submit" className="btn btn-dark w-100 d-grid mx-auto">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default observer(Register);
