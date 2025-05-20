document.addEventListener('DOMContentLoaded', function() {
  // Evitar inicialização duplicada
  if (window.chatWidgetInitialized) return;
  window.chatWidgetInitialized = true;
  // Gerar ID de sessão único
  const generateSessionId = () => {
    // Combine timestamp with random numbers for uniqueness
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000000);
    // Concatenate to create a numeric-only ID without hyphens
    return parseInt(timestamp.toString() + randomNum.toString());
  };
  
  // Get or create a session ID
  let sessionId = localStorage.getItem('gao_chat_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('gao_chat_session_id', sessionId);
  }
  console.log('Using session ID:', sessionId);
  
  // Adicionar HTML do widget de chat ao final do body
  const widgetHTML = `
    <!-- Chat Bar (quando fechado) -->
    <div class="chat-bar" id="chatBar">
      <div class="avatar">
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </span>
      </div>
      <input type="text" class="chat-input-placeholder" placeholder="Envie uma mensagem..." readonly>
      <div class="send-icon">
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </span>
      </div>
    </div>

    <!-- Chat Widget (quando aberto) -->
    <div class="chat-widget" id="chatWidget">
      <!-- Botão fechar -->
      <button class="close-button" id="closeButton">×</button>
      
      <!-- Área de mensagens -->
      <div class="messages-container" id="messagesContainer">
        <!-- Bot welcome message - will be added by JavaScript -->
      </div>
      
      <!-- Área de input -->
      <div class="input-container">
        <div class="input-wrapper">
          <input 
            type="text" 
            class="message-input" 
            id="messageInput" 
            placeholder="Digite sua mensagem..."
          >
          <button class="send-button" id="sendButton">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Adicionar HTML ao final do body
  const widgetContainer = document.createElement('div');
  widgetContainer.innerHTML = widgetHTML;
  document.body.appendChild(widgetContainer);
  
  // Icons SVG
  const userIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  `;

  const botIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
      <circle cx="12" cy="5" r="2"></circle>
      <path d="M12 7v4"></path>
      <line x1="8" y1="16" x2="8" y2="16"></line>
      <line x1="16" y1="16" x2="16" y2="16"></line>
    </svg>
  `;
  
  // DOM Elements
  const chatBar = document.getElementById('chatBar');
  const chatWidget = document.getElementById('chatWidget');
  const closeButton = document.getElementById('closeButton');
  const messagesContainer = document.getElementById('messagesContainer');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');

  // Toggle chat widget
  function toggleChat(event) {
    if (event) event.stopPropagation();
    if (chatWidget.style.display === 'flex') {
      chatWidget.style.display = 'none';
      chatBar.style.display = 'flex';
    } else {
      chatWidget.style.display = 'flex';
      chatBar.style.display = 'none';
      // Focus the input when opening
      setTimeout(() => messageInput.focus(), 100);
    }
  }

  // Add event listeners
  chatBar.addEventListener('click', toggleChat);
  closeButton.addEventListener('click', toggleChat);
  
  // Fechar o chat quando clicar fora (opcional - adiciona mais robustez)
  document.addEventListener('click', function(event) {
    if (chatWidget.style.display === 'flex' && 
        !chatWidget.contains(event.target) && 
        !chatBar.contains(event.target)) {
      toggleChat();
    }
  });
  
  // Lidar com redimensionamento da janela
  window.addEventListener('resize', function() {
    // Ajustar layout se necessário
    if (window.innerWidth <= 480 && chatWidget.style.display === 'flex') {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });

  // Format time
  function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Add message to chat
  function addMessage(text, isUser) {
    // Create message wrapper
    const messageWrapper = document.createElement('div');
    messageWrapper.className = isUser ? 'message-wrapper user' : 'message-wrapper bot';

    // Create message content container
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user' : 'message bot';

    // Create message bubble
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    
    // Process text to handle line breaks and preserve formatting
    const formattedText = text.replace(/\n/g, '<br>');
    bubbleDiv.innerHTML = formattedText;

    // Create time element
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = formatTime();

    // Create icon
    const iconDiv = document.createElement('div');
    iconDiv.className = isUser ? 'message-icon user' : 'message-icon bot';
    iconDiv.innerHTML = isUser ? userIconSvg : botIconSvg;

    // Assemble the message
    messageDiv.appendChild(bubbleDiv);
    messageDiv.appendChild(timeDiv);

    // Add icon and message to wrapper in correct order
    if (isUser) {
      messageWrapper.appendChild(messageDiv);
      messageWrapper.appendChild(iconDiv);
    } else {
      messageWrapper.appendChild(iconDiv);
      messageWrapper.appendChild(messageDiv);
    }

    // Add to container
    messagesContainer.appendChild(messageWrapper);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Send message
  async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;
    
    // Desabilitar o botão de envio para evitar envios duplicados
    sendButton.disabled = true;
    sendButton.style.opacity = '0.7';

    // Add user message
    addMessage(text, true);
    messageInput.value = '';
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message-wrapper bot';
    typingIndicator.innerHTML = `
      <div class="message-icon bot">${botIconSvg}</div>
      <div class="message bot">
        <div class="message-bubble typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    try {
      // Verificar se estamos em ambiente local
      const isLocalhost = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname === '';
      
      // Dados a serem enviados
      const messageData = {
        message: text,
        sessionId: sessionId
      };
      
      // Log para debug
      console.log('Enviando mensagem:', messageData);
      
      let data;
      
      // Determina a URL do proxy com base no ambiente
      const getProxyUrl = () => {
        // Verificar se estamos em ambiente local
        if (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1') {
          return 'http://localhost:9092/proxy-api';
        } else {
          // Em produção, usar URL relativa para evitar CORS
          // Isso assume que o proxy está sendo servido do mesmo domínio
          return '/proxy-api';
        }
      };

      // URL do proxy que encaminhará para o webhook
      const proxyUrl = getProxyUrl();
      console.log('Usando proxy URL:', proxyUrl);
      
      // Preparar os dados para envio
      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      };
      
      try {
        // Tentar enviar a requisição para o proxy com timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos de timeout
        
        console.log('Enviando requisição para o proxy...');
        const response = await fetch(proxyUrl, {
          ...requestData,
          signal: controller.signal
        });
          
        clearTimeout(timeoutId);
        
        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro na comunicação com o servidor: ${response.status}`);
        }
        
        // Processar a resposta do proxy
        data = await response.json();
        console.log('Resposta recebida do proxy:', data);
      } catch (fetchError) {
        console.error('Erro ao comunicar com o proxy:', fetchError);
        if (fetchError.name === 'AbortError') {
          throw new Error('A requisição excedeu o tempo limite. Verifique sua conexão.');
        }
        throw fetchError;
      }
      
      // Remove typing indicator
      messagesContainer.removeChild(typingIndicator);
      
      // Adicionar resposta do webhook ou resposta padrão se não houver
      let resposta = "Obrigado por entrar em contato com a Gao Tech! Estamos processando sua solicitação.";
      
      if (data && data.response) {
        resposta = data.response;
      } else if (data && data.reply) {
        resposta = data.reply;
      } else if (data && data.output) {
        resposta = data.output;
      } else if (data && data.error) {
        console.error('Erro recebido do servidor:', data.error);
        resposta = data.message || 'Ocorreu um erro ao processar sua solicitação.';
      }
      
      // Adicionar resposta do bot
      addMessage(resposta, false);
      
      // Log para debug
      console.log('Resposta processada:', data);
      
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      
      // Remove typing indicator if it exists
      if (messagesContainer.contains(typingIndicator)) {
        messagesContainer.removeChild(typingIndicator);
      }
      
      // Show error message
      addMessage('Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.', false);
    } finally {
      // Reativar o botão de envio
      sendButton.disabled = false;
      sendButton.style.opacity = '1';
    }
  }

  // Send message on button click
  sendButton.addEventListener('click', sendMessage);

  // Send message on Enter key
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Verificar se o container de mensagens está vazio antes de adicionar a mensagem inicial
  if (messagesContainer.children.length === 0) {
    // Add initial bot message
    addMessage(`Bem vindo a Gao Tech.
Somos especialistas em tecnologia. Nossa missão é tornar sua vida mais simples e conectada
por meio de soluções inovadoras.

Como podemos ajudar?`, false);
  }
});
