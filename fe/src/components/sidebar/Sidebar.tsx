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
      <div className="sidebar-medipal-logo">
        <img src="/assets/logo.png" alt="medipal-logo" />
        <h3>Medipal</h3>
      </div>
      <div className="sidebar-items">
        {items.map((item) => (
          <div key={`sidebar-${item}`} className="sidebar-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
