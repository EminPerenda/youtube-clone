import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileDropdown.css"; // Uvozimo CSS za stilizaciju

const ProfileDropdown = () => {
  // Stanje koje prati da li je meni otvoren
  const [isOpen, setIsOpen] = useState(false);

  // Hook za redirekciju
  const navigate = useNavigate();

  // Podaci tvog korisnika (u stvarnoj aplikaciji ovo vjerovatno dolazi iz konteksta ili API-ja)
  const user = {
    firstName: "Tvoje",
    lastName: "Ime",
    username: "@tvojusername",
    avatarUrl: "https://via.placeholder.com/150", // Zamijeni linkom svoje slike
  };

  // Funkcija za otvaranje/zatvaranje menija
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Funkcija za redirekciju na profil
  const goToProfile = () => {
    navigate("/profile"); // Redirektuje na /profile rutu
    setIsOpen(false); // Zatvara meni nakon klika
  };

  return (
    <div className="profile-menu-container">
      {/* Slika profila */}
      <img
        src={user.avatarUrl}
        alt="Profile Avatar"
        className="profile-avatar"
        onClick={toggleDropdown}
      />

      {/* Dropdown Meni - prikazuje se samo ako je isOpen === true */}
      {isOpen && (
        <div className="dropdown-menu">
          {/* Informacije (Nisu buttoni, samo tekst) */}
          <div className="dropdown-info">
            <span className="user-fullname">
              {user.firstName} {user.lastName}
            </span>
            <span className="user-username">{user.username}</span>
          </div>

          <hr className="dropdown-divider" />

          {/* Profile button */}
          <button className="profile-btn" onClick={goToProfile}>
            Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
