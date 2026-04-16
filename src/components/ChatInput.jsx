// ChatInput.jsx
// Text input bar at the bottom for typing and sending messages

import { useState } from 'react';

function ChatInput({ onSend, disabled }) {

  const [text, setText] = useState('');

  // handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText(''); // clear input after sending
  }

  // allow sending with Enter key (Shift+Enter for new line)
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <div className="chat-input-wrap">
      <form className="chat-input-form" onSubmit={handleSubmit}>

        <input
          type="text"
          className="chat-input"
          placeholder={disabled ? 'Reconnecting...' : 'Type a message...'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          maxLength={500}
          autoFocus
        />

        <button
          type="submit"
          className="send-btn"
          disabled={disabled || !text.trim()}
          title="Send message"
        >
          Send ➤
        </button>

      </form>

      {/* character counter */}
      {text.length > 400 && (
        <span className="char-count">{text.length} / 500</span>
      )}
    </div>
  );
}

export default ChatInput;