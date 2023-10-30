import React from "react";
import ProfileCard from "./ProfileCard";
import MenuItems from "./MenuItems";
import MedipalPicture from "../../medipalpicture.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api";
import "./sidebar.css";
import useInactivity from "../../hooks/useInactivity";
import { useEffect } from "react";

const Sidebar = () => {
  const profilePictureURL = null;

  const [cookies, setCookies, removeCookie] = useCookies();
  const navigate = useNavigate();

  const isActive = useInactivity();

  const name = cookies["firstName"];

  const handleLogout = async () => {
    await logout(cookies["sessionid"]).finally(() => {
      removeCookie("lastName");
      removeCookie("firstName");
      removeCookie("sessionid");
      removeCookie("email");
      navigate("/");
    });
  };

  useEffect(() => {
    // Auto logs user out if no activity detected
    if (!isActive) {
      handleLogout();
    }
  }, [isActive]);

  return (
    <div className="sidebar">
      <ProfileCard
        profilePicture={MedipalPicture}
        name="MediPal"
        status={name}
        //change to {name} and {status} {profilePicture} when Backend is setup
      />
      {/* Add the MenuItems component */}
      <MenuItems />
      {/* Add the rest of the sidebar content here */}

      <div onClick={handleLogout} className="menu-item">
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
