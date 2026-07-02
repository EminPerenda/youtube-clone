import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Dodan useNavigate
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/user.jpg";

export const Navbar = ({ setSidebar }) => {
  // 1. Dodajemo state za dropdown meni
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // 2. Inicijalizujemo hook za redirekciju
  const navigate = useNavigate();

  // 3. Funkcija za klik na "Profile"
  const goToProfile = () => {
    navigate("/profile");
    setIsProfileMenuOpen(false); // Zatvara meni nakon redirekcije
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          onClick={() => setSidebar((prev) => (prev === false ? true : false))}
          src={menu_icon}
          alt=""
        />
        <Link to="/">
          <img className="logo" src={logo} alt="Home" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <img src={search_icon} alt="" />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />

        <div className="profile-container">
          <img
            src={profile_icon}
            className="user-icon"
            alt="Profile"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            style={{ cursor: "pointer" }}
          />

          {isProfileMenuOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-info">
                <strong>Emin Perenda</strong>
                <span>@eminperenda</span>
              </div>
              <hr />
              <button className="profile-btn" onClick={goToProfile}>
                Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
