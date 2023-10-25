import React from "react";
import ProfileCard from "./ProfileCard";
import MenuItems from "./MenuItems";
import MedipalPicture from "../../medipalpicture.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const profilePictureURL = null;

  const [cookies, setCookies, removeCookie] = useCookies();
  const navigate = useNavigate();

  const name = cookies["firstName"];

  const logout = () => {
    removeCookie("lastName");
    removeCookie("firstName");
    removeCookie("sessionid");
    removeCookie("email");
    navigate("/");
  };

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

      <div onClick={logout} className="menu-item">
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
