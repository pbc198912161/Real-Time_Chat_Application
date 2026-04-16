// ChatHeader.jsx
// Top bar showing room name, status, online count, and leave button

function ChatHeader({ username, status, onlineCount, onLeave }) {

  // pick colour and label based on connection status
  function getStatusInfo() {
    if (status === 'connected')    return { dot: 'dot-green',  label: 'Connected'    };
    if (status === 'connecting')   return { dot: 'dot-yellow', label: 'Connecting...' };
    return                                { dot: 'dot-red',    label: 'Disconnected'  };
  }

  const { dot, label } = getStatusInfo();

  return (
    <div className="chat-header">

      {/* Left side - room info */}
      <div className="header-left">
        <span className="header-icon">💬</span>
        <div>
          <h2 className="header-title">ChatRoom</h2>
          <span className="header-sub">{onlineCount} online</span>
        </div>
      </div>

      {/* Center - connection status */}
      <div className="header-status">
        <span className={`status-dot ${dot}`}></span>
        <span className="status-label">{label}</span>
      </div>

      {/* Right side - user name + leave */}
      <div className="header-right">
        <span className="header-username">👤 {username}</span>
        <button className="leave-btn" onClick={onLeave} title="Leave chat">
          Leave
        </button>
      </div>

    </div>
  );
}

export default ChatHeader;