import React from 'react';
import { UserIcon, BotIcon } from './ChatIcons';

const MessageList = ({ messages, isTyping, messagesContainerRef }) => {
  return (
    <div className="messages-container" ref={messagesContainerRef}>
      {/* Mapear todas as mensagens */}
      {messages.map((message, index) => (
        <div key={index} className={`message-wrapper ${message.isUser ? 'user' : 'bot'}`}>
          {!message.isUser && (
            <div className="message-icon bot"><BotIcon /></div>
          )}
          
          <div className={`message ${message.isUser ? 'user' : 'bot'}`}>
            <div className="message-bubble" 
              dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br>') }}
            />
            <div className="message-time">{message.time}</div>
          </div>
          
          {message.isUser && (
            <div className="message-icon user"><UserIcon /></div>
          )}
        </div>
      ))}
      
      {/* Indicador de digitação */}
      {isTyping && (
        <div className="message-wrapper bot">
          <div className="message-icon bot"><BotIcon /></div>
          <div className="message bot">
            <div className="message-bubble typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
