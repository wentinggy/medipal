import "components/sidebar/Sidebar.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { apiClient } from "services/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";

interface SidebarProps {
  handleNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ handleNewChat }) => {
  const navigate = useNavigate();
  const name = Cookies.get("name") ?? "";

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleLogout = async () => {
    const sessionId: string = Cookies.get("sessionid") ?? "";
    await apiClient.logout(sessionId).finally(() => {
      Cookies.remove("email");
      Cookies.remove("name");
      navigate("/");
    });
  };

  function toggleSidebar(): void {
    const sidebar: HTMLElement | null = document.querySelector(".sidebar");
    if (sidebar) {
      const newLeft: string = isExpanded ? "-250px" : "0px";
      sidebar.style.left = newLeft;
      setIsExpanded((prev: boolean) => !prev);
    }
  }

  return (
    <>
      {!isExpanded && (
        <MenuIcon onClick={toggleSidebar} className="menu-float" />
      )}
      <div className="sidebar">
        <div className="sidebar-medipal-logo">
          <img src="/assets/logo.png" alt="medipal-logo" />
          <h3>Medipal</h3>
          {isExpanded && (
            <IconButton onClick={toggleSidebar} className="menu-btn">
              <MenuIcon />
            </IconButton>
          )}
        </div>
        <div className="sidebar-user-card">
          <div className="sidebar-user-content">
            <div className="sidebar-user-img">
              <AccountCircleIcon fontSize="large" />
            </div>
            <div className="sidebar-user-info">
              {capitalize(name) ?? "User"}
              <span className="sidebar-user-status"> User</span>
            </div>
          </div>
        </div>
        <div className="sidebar-items">
          <div className="sidebar-item" onClick={handleNewChat}>
            <div className="sidebar-item-logo">
              <AddCircleOutlineIcon />
            </div>
            <h4>New Chat</h4>
          </div>
        </div>
        <div className="logout-bar" onClick={handleLogout}>
          <IconButton>
            <LogoutIcon fontSize="small" />
          </IconButton>
          <h4>Logout</h4>
        </div>
      </div>
    </>
  );
};
