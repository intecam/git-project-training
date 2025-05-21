import React from 'react';

const ChatHeader = ({ toggleChat }) => {
  return (
    <div className="chat-header">
      <button className="close-button" onClick={toggleChat}>×</button>
    </div>
  );
};

export default ChatHeader;
