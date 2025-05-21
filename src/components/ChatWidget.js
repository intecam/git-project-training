import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';

// Importando subcomponentes 
import ChatBar from './ChatWidget/ChatBar';
import ChatHeader from './ChatWidget/ChatHeader';
import MessageList from './ChatWidget/MessageList';
import MessageInput from './ChatWidget/MessageInput';

// Importando utilitários
import { formatTime, getSessionId } from './ChatWidget/ChatUtils';

// Importando API
import { sendMessageToApi } from '../services/api';

const ChatWidget = ({ proxyUrl = '/proxy-api' }) => {
  // Estado para controlar visibilidade do chat
  const [isOpen, setIsOpen] = useState(false);
  // Estado para armazenar mensagens
  const [messages, setMessages] = useState([]);
  // Estado para o texto da mensagem atual
  const [messageText, setMessageText] = useState('');
  // Estado para indicar quando o bot está digitando
  const [isTyping, setIsTyping] = useState(false);
  // Referência para o container de mensagens (para scroll automático)
  const messagesContainerRef = useRef(null);
  
  // Obtendo ID de sessão
  const [sessionId] = useState(() => getSessionId());
  
  // Efeito para adicionar mensagem de boas-vindas ao iniciar o chat
  useEffect(() => {
    // Adicionar mensagem de boas-vindas inicial
    const welcomeMessage = {
      text: `Bem vindo a Gao Tech.
Somos especialistas em tecnologia Nossa missão é tornar sua vida mais simples e conectada
por meio de soluções inovadoras.

Como podemos ajudar?`,
      isUser: false,
      time: formatTime()
    };
    
    setMessages([welcomeMessage]);
  }, []);
  
  // Efeito para scroll automático para a última mensagem
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);
  
  // Alternar entre aberto/fechado
  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Foca o input quando abrir o chat
    if (!isOpen) {
      setTimeout(() => {
        document.getElementById('messageInput')?.focus();
      }, 100);
    }
  };
  
  // Enviar mensagem
  const sendMessage = async () => {
    const text = messageText.trim();
    if (!text) return;
    
    // Limpar input
    setMessageText('');
    
    // Adicionar mensagem do usuário
    const userMessage = {
      text,
      isUser: true,
      time: formatTime()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Mostrar indicador de digitação
    setIsTyping(true);
    
    try {
      // Enviar mensagem para a API
      const data = await sendMessageToApi(text, sessionId, proxyUrl);
      
      // Remover indicador de digitação
      setIsTyping(false);
      
      // Adicionar resposta do bot
      if (data && data.response) {
        const botMessage = {
          text: data.response,
          isUser: false,
          time: formatTime()
        };
        
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else {
        const errorMessage = {
          text: 'Desculpe, não consegui processar sua solicitação.',
          isUser: false,
          time: formatTime()
        };
        
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      // Remover indicador de digitação
      setIsTyping(false);
      
      // Mostrar mensagem de erro
      const errorMessage = {
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        isUser: false,
        time: formatTime()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };
  
  // Lidar com pressionar Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  return (
    <>
      {/* Chat Bar (quando fechado) */}
      {!isOpen && <ChatBar toggleChat={toggleChat} />}
      
      {/* Chat Widget (quando aberto) */}
      <div className="chat-widget" style={{ display: isOpen ? 'flex' : 'none' }}>
        {/* Botão fechar */}
        <ChatHeader toggleChat={toggleChat} />
        
        {/* Área de mensagens */}
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
          messagesContainerRef={messagesContainerRef} 
        />
        
        {/* Área de input */}
        <MessageInput 
          messageText={messageText}
          setMessageText={setMessageText}
          sendMessage={sendMessage}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
};

export default ChatWidget;
