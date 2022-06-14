import React from 'react';
import './ChatBubble.scss';

function ChatBubble({ name }) {
  return (
    <div className="bubble">
      <div className="typing">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="ml-1">{`${name} is typing`}</div>
      </div>
    </div>
  );
}

export default ChatBubble;
