/* Imports */
import React, { useState } from "react";

/* State and Store */
import authStore from "../../stores/authStore";
import companyStore from "../../stores/companyStore";
import { observer } from "mobx-react";

/* Styles */
import { CoverImage, Logo } from "../authentication/styles";
import LoGo from "../../media/LOGO.svg";

const RegisterWorker = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  if (authStore.loading || companyStore.loading) {
    return <h1>Loading...</h1>;
  }

  /* handle the change of all inputs */
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  /* Submit handler */
  const handleSubmit = async (event) => {
    event.preventDefault();
    user.userType = "worker";
    user.email = `${user.username}@worker.com`;
    // TODO: inherit company id
    user.companyId = companyStore.company.id;
    await authStore.register(user);
    event.target.reset();
  };

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
          <div className="brand d-flex flex-column align-items-center">
            <Logo alt="LOGO" src={LoGo} />
            <h4>Bunyan</h4>
          </div>

          {/* Title Form */}
          <h3 className="text-center mb-3">Create a Worker account</h3>

          {/* Register Form */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  autoComplete="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={`${user.username}@worker.com`}
                  disabled={true}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <input
                  name="phoneNumber"
                  type="tel"
                  className="form-control"
                  placeholder="Phone Number"
                  minLength="7"
                  maxLength="8"
                  pattern="[0-9]+"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark w-100 d-grid mx-auto">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(RegisterWorker);
