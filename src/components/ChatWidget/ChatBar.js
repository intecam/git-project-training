import React from 'react';
import { ArrowIcon, SendIcon } from './ChatIcons';

const ChatBar = ({ toggleChat }) => {
  return (
    <div className="chat-bar" onClick={toggleChat}>
      <div className="avatar">
        <span className="icon">
          <ArrowIcon />
        </span>
      </div>
      <input 
        type="text" 
        className="chat-input-placeholder" 
        placeholder="Envie uma mensagem..." 
        readOnly 
      />
      <div className="send-icon">
        <span className="icon">
          <SendIcon />
        </span>
      </div>
    </div>
  );
};

export default ChatBar;
