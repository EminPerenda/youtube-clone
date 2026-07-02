import React from "react";
import "./Profile.css";
import user from "../../assets/user.jpg";

export const Profile = () => {
  return (
    <div className="profile-page">
      <h1>Korisnički profil</h1>
      <div className="profile-card">
        <div>
          <img className="avatar-placeholder" src={user} alt="" />
        </div>
        <h2>Emin Perenda</h2>
        <p>
          <strong>Username:</strong> @eminperenda
        </p>
        <p>
          <strong>Email:</strong> eminperenda@gmail.com
        </p>
      </div>
    </div>
  );
};
