// JoinScreen.jsx
// The screen shown before user enters the chat

import { useState } from 'react';

function JoinScreen({ onJoin }) {

  const [name, setName]   = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }

    setError('');
    onJoin(name.trim());
  }

  return (
    <div className="join-screen">
      <div className="join-box">

        {/* Logo / Icon */}
        <div className="join-icon">💬</div>

        <h1>ChatRoom</h1>
        <p>Enter your name to join the live chat</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            autoFocus
          />

          {/* show error if name is too short */}
          {error && <span className="join-error">{error}</span>}

          <button type="submit">Join Chat →</button>
        </form>

        <p className="join-note">
          No account needed · Real-time messaging · Free
        </p>

      </div>
    </div>
  );
}

export default JoinScreen;