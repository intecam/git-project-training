import React from 'react';
import ReactDOM from 'react-dom';
import ChatWidget from './components/ChatWidget';
import './index.css';

// Função global para inicializar o widget em sites não-React
window.initGaoChatWidget = (elementId, options = {}) => {
  const container = document.getElementById(elementId);
  if (!container) {
    console.error(`Elemento com ID '${elementId}' não encontrado.`);
    return;
  }

  ReactDOM.render(
    <React.StrictMode>
      <ChatWidget {...options} />
    </React.StrictMode>,
    container
  );
};

// Auto-inicializar se o elemento padrão existir
document.addEventListener('DOMContentLoaded', () => {
  const defaultContainer = document.getElementById('gao-chat-widget');
  if (defaultContainer) {
    window.initGaoChatWidget('gao-chat-widget');
  }
});
