// App.jsx
// Main component - manages all state and WebSocket connection

import { useState, useEffect, useRef } from 'react';
import JoinScreen   from './components/JoinScreen';
import ChatHeader   from './components/ChatHeader';
import MessageList  from './components/MessageList';
import ChatInput    from './components/ChatInput';
import './App.css';

// We use a free public echo WebSocket server for demo purposes.
// It echoes back whatever we send — simulates receiving from another user.
const WS_URL = 'wss://echo.websocket.org';

function App() {

  // ---- STATE ----
  const [username, setUsername]     = useState('');
  const [joined, setJoined]         = useState(false);
  const [messages, setMessages]     = useState([]);
  const [status, setStatus]         = useState('disconnected'); // connected | disconnected | connecting
  const [onlineCount, setOnlineCount] = useState(1);

  // ref to hold the WebSocket instance across renders
  const socketRef = useRef(null);

  // ---- CONNECT TO WEBSOCKET WHEN USER JOINS ----
  useEffect(() => {
    if (!joined) return;

    setStatus('connecting');

    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    // connection opened
    socket.onopen = () => {
      setStatus('connected');
      setOnlineCount(Math.floor(Math.random() * 8) + 2); // fake online count for demo

      // add a system message
      addSystemMessage('You joined the chat 👋');
    };

    // message received from server (echo)
    socket.onmessage = (event) => {
      // The echo server sends back what we sent.
      // We parse it and show it as a received message.
      try {
        const data = JSON.parse(event.data);

        // only show echo as "received" if it's not our own system message
        if (data.type === 'chat') {
          const receivedMsg = {
            id:       Date.now() + Math.random(),
            text:     data.text,
            sender:   data.sender,
            time:     getCurrentTime(),
            isOwn:    false,         // echo comes back as "other" user
            type:     'chat'
          };
          setMessages(prev => [...prev, receivedMsg]);
        }
      } catch (e) {
        // not JSON, ignore
      }
    };

    // connection closed
    socket.onclose = () => {
      setStatus('disconnected');
      addSystemMessage('Disconnected from chat.');
    };

    // connection error
    socket.onerror = () => {
      setStatus('disconnected');
      addSystemMessage('Connection error. Messages shown locally.');
    };

    // cleanup when component unmounts
    return () => {
      socket.close();
    };

  }, [joined]);

  // ---- HELPER: add a system message ----
  function addSystemMessage(text) {
    setMessages(prev => [...prev, {
      id:     Date.now() + Math.random(),
      text:   text,
      sender: 'System',
      time:   getCurrentTime(),
      isOwn:  false,
      type:   'system'
    }]);
  }

  // ---- HELPER: get current time string ----
  function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' +
           now.getMinutes().toString().padStart(2, '0');
  }

  // ---- SEND MESSAGE ----
  function sendMessage(text) {
    if (!text.trim()) return;

    // build the message object
    const msgObj = {
      type:   'chat',
      text:   text.trim(),
      sender: username,
      time:   getCurrentTime()
    };

    // add to local messages as "own" message immediately
    const ownMsg = {
      ...msgObj,
      id:    Date.now(),
      isOwn: true
    };
    setMessages(prev => [...prev, ownMsg]);

    // send to WebSocket server (it will echo back)
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msgObj));
    }
  }

  // ---- JOIN CHAT ----
  function handleJoin(name) {
    setUsername(name);
    setJoined(true);
  }

  // ---- LEAVE CHAT ----
  function handleLeave() {
    if (socketRef.current) {
      socketRef.current.close();
    }
    setJoined(false);
    setMessages([]);
    setUsername('');
    setStatus('disconnected');
  }

  // ---- RENDER ----
  return (
    <div className="app-wrapper">

      {/* Show join screen if not joined yet */}
      {!joined ? (
        <JoinScreen onJoin={handleJoin} />
      ) : (
        <div className="chat-container">

          <ChatHeader
            username={username}
            status={status}
            onlineCount={onlineCount}
            onLeave={handleLeave}
          />

          <MessageList
            messages={messages}
            currentUser={username}
          />

          <ChatInput
            onSend={sendMessage}
            disabled={status === 'disconnected'}
          />

        </div>
      )}

    </div>
  );
}

export default App;