import React from 'react';
import { SendIcon } from './ChatIcons';

const MessageInput = ({ messageText, setMessageText, sendMessage, handleKeyDown }) => {
  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input 
          type="text"
          id="messageInput"
          className="message-input"
          placeholder="Digite sua mensagem..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="send-button" onClick={sendMessage}>
          <span className="icon">
            <SendIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
