import React, { useState } from "react";

import { observer } from "mobx-react";

function Profile() {
  /* New State to handle the object of user */
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    /*ToDo: image  */
  });

  /* handle the input change */
  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  /* handle sumbit of the form */
  const handleSubmit = async (event) => {
    event.preventDefault();
    /* ToDo: update the profile */
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3 mb-3">
        <div className="col">
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <input
          name="bio"
          type="text"
          className="form-control"
          placeholder="bio"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-dark w-100 d-grid mx-auto">
        Login
      </button>
    </form>
  );
}

export default observer(Profile);
