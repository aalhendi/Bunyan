/* Imports */
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

/* State and Store */
import { observer } from "mobx-react";
import authStore from "../../stores/authStore";

/* Styles */
import { CoverImage, Logo } from "./styles";
import LoGo from "../../media/LOGO.svg";

const Profile = () => {
  /* Fetch Profile */
  const userProfile = authStore.user.profile;
  /* New State to handle the object of user */
  const [profile, setProfile] = useState(
    userProfile
      ? userProfile
      : {
          name: "",
          bio: "",
          /*ToDo: image  */
        }
  );

  const [click, setClick] = useState(false);

  /* handle the input change */
  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  /* handle sumbit of the form */
  const handleSubmit = async (event) => {
    event.preventDefault();
    /* ToDo: update the profile */
    await authStore.updateProfile(profile);
    setClick(true);
    event.target.reset();
  };
  /* Check if the user not logged in will redirect to login  */
  if (click || !authStore.user) {
    return <Redirect to="/login" />;
  }
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
          <h3 className="text-center mb-3">Compnay Profile</h3>

          {/* Register Form */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col">
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Company Name"
                  onChange={handleChange}
                  value={profile.name}
                  minLength="1"
                />
              </div>
            </div>
            <div className="mb-3">
              <input
                name="bio"
                type="text"
                className="form-control"
                placeholder="Compnay Bio"
                onChange={handleChange}
                value={profile.bio}
              />
            </div>
            <button type="submit" className="btn btn-dark w-100 d-grid mx-auto">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(Profile);
