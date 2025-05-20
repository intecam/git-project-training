const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();

// Configuração do CORS para permitir todas as origens
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota proxy para o webhook do n8n
app.post('/proxy-api', async (req, res) => {
  console.log('Recebida solicitação para o proxy:', req.body);
  
  try {
    // URL do webhook n8n
    const targetUrl = 'https://webhook.gaotech.com.br/webhook/f7536d59-eed7-4b27-858e-a8f66f462c08/chat';
    
    console.log('Encaminhando para:', targetUrl);
    console.log('Payload:', req.body);
    
    // Encaminhar a solicitação para o webhook n8n
    const response = await axios.post(targetUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000 // 10 segundos de timeout
    });
    
    console.log('Resposta do webhook:', response.status);
    console.log('Dados da resposta:', JSON.stringify(response.data, null, 2));
    
    // Processamento padronizado da resposta
    if (response.data && typeof response.data === 'object') {
      console.log('Campos da resposta:', Object.keys(response.data));
      
      // Verificar se a resposta tem um campo específico de resposta do webhook
      if (response.data.output) {
        console.log('Usando campo output da resposta');
        res.json({ response: response.data.output });
      } else if (response.data.reply) {
        console.log('Usando campo reply da resposta');
        res.json({ response: response.data.reply });
      } else {
        // Se não tiver campo específico, enviar a resposta completa
        console.log('Usando resposta completa');
        res.json({ response: response.data.response || JSON.stringify(response.data) });
      }
    } else {
      // Se não for um objeto, converter para string
      console.log('Resposta não é um objeto, enviando como string');
      res.json({ response: String(response.data) });
    }
  } catch (error) {
    console.error('Erro ao encaminhar solicitação:', error.message);
    
    let detalhesErro = {
      message: error.message
    };
    
    if (error.response) {
      console.error('Detalhes do erro:', {
        status: error.response.status,
        data: error.response.data
      });
      detalhesErro.status = error.response.status;
      detalhesErro.data = error.response.data;
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout na requisição');
      res.status(504).json({
        error: 'Timeout na requisição',
        message: 'O servidor demorou muito para responder. Por favor, tente novamente.',
        response: 'Desculpe, o servidor demorou muito para responder. Por favor, tente novamente.'
      });
    } else {
      res.status(500).json({
        error: 'Erro ao processar solicitação',
        details: detalhesErro,
        response: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.'
      });
    }
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 9092;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Abra esta URL no navegador para testar o widget de chat');
});
