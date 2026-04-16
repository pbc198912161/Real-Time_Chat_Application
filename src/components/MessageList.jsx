// MessageList.jsx
// Scrollable area that shows all messages

import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

function MessageList({ messages, currentUser }) {

  // ref to the bottom of the list so we can auto-scroll
  const bottomRef = useRef(null);

  // scroll to bottom every time messages update
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="message-list">

      {/* Show a placeholder if no messages yet */}
      {messages.length === 0 && (
        <div className="empty-chat">
          <span>No messages yet. Say hello! 👋</span>
        </div>
      )}

      {/* Render each message */}
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isOwn={msg.sender === currentUser && msg.type !== 'system'}
        />
      ))}

      {/* Invisible div at the bottom for auto-scroll */}
      <div ref={bottomRef} />

    </div>
  );
}

export default MessageList;