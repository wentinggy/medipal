import "components/sidebar/Sidebar.scss";

export default function Sidebar() {
  const items = [
    "New Chat",
    "Chat History",
    "Ask a Question",
    "Saved Chats",
    "Logout",
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-user-card">
        <div className="sidebar-user-content">
          <div className="sidebar-user-img" />
          <div className="sidebar-user-info">
            Jane Doe
            <span className="sidebar-user-status"> User</span>
          </div>
        </div>
      </div>
      <div className="sidebar-items">
        {items.map((item) => (
          <div className="sidebar-item">{item}</div>
        ))}
      </div>
    </div>
  );
}
