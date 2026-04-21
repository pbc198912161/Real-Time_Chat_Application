# REAL-TIME CHAT APPLICATION

**COMPANY**: CODTECH IT SOLUTIONS

**NAME**: P BHARATH CHOWDARY

**INTERN ID**: CTIS8198

**DOMAIN**: FRONTEND WEB DEVELOPMENT

**DURATION**: 4 WEEKS

**MENTOR**: NEELA SANTHOSH KUMAR

---

# DESCRIPTION OF TASK

## Overview
A Real-Time Chat Application built using React.js (Vite) and the WebSocket API. Users can join the chat by entering their name, send and receive messages in real time, and see live connection status. The app uses a free public WebSocket echo server to simulate real-time two-way communication.

## What I Performed
- Set up a Vite + React project from scratch and structured it using a component-based architecture.
- Integrated the browser's built-in WebSocket API to establish a persistent real-time connection.
- Split the UI into reusable React components: JoinScreen, ChatHeader, MessageList, MessageBubble, and ChatInput.
- Used React hooks (useState, useEffect, useRef) to manage state, side effects, and the WebSocket instance.
- Implemented a join screen with name validation before entering the chat.
- Built auto-scrolling message list that always shows the latest message.
- Own messages appear on the right (blue bubble), received messages appear on the left (glass bubble).
- Added connection status indicator (green = connected, yellow = connecting, red = disconnected).
- Added system messages for join/leave events.
- Used a dark gradient background with frosted glass card UI.
- Made the app fully responsive for mobile and desktop.

## Features
- Real-time WebSocket messaging
- Join screen with name validation
- Own messages on right, others on left
- Live connection status indicator (Connected / Connecting / Disconnected)
- Auto-scroll to latest message
- Message timestamps
- System messages (joined / disconnected)
- Leave chat button
- Responsive design (mobile + desktop)

## Technologies Used
- React.js (with Vite)
- WebSocket API (browser built-in)
- CSS3 (Glassmorphism, Gradient backgrounds)
- JavaScript ES6+ (useState, useEffect, useRef)

## How to Run
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:5173` in your browser

## Output Screenshots
<img width="1920" height="1080" alt="Screenshot 2026-04-21 135834" src="https://github.com/user-attachments/assets/0eb5d943-0fe9-41c5-94e3-26ee869b6910" />
<img width="1920" height="1080" alt="Screenshot 2026-04-21 135811" src="https://github.com/user-attachments/assets/5891fb26-9564-40fc-af03-e302bdee794e" />

