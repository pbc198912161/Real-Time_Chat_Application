// MessageBubble.jsx
// Individual message bubble - own messages on right, others on left

function MessageBubble({ message, isOwn }) {

  // system messages (join/leave/errors) are centered
  if (message.type === 'system') {
    return (
      <div className="system-message">
        <span>{message.text}</span>
      </div>
    );
  }

  return (
    <div className={`bubble-wrap ${isOwn ? 'own' : 'other'}`}>

      {/* Show sender name only for received messages */}
      {!isOwn && (
        <span className="bubble-sender">{message.sender}</span>
      )}

      <div className={`bubble ${isOwn ? 'bubble-own' : 'bubble-other'}`}>
        <p className="bubble-text">{message.text}</p>
        <span className="bubble-time">{message.time}</span>
      </div>

    </div>
  );
}

export default MessageBubble;