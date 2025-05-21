/**
 * Serviço para comunicação com a API
 */

/**
 * Envia mensagem para o servidor e retorna a resposta
 * @param {string} message - Mensagem do usuário
 * @param {string} sessionId - ID da sessão
 * @param {string} proxyUrl - URL da API
 * @returns {Promise<Object>} - Resposta da API
 */
export const sendMessageToApi = async (message, sessionId, proxyUrl) => {
  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        sessionId
      })
    });
    
    if (!response.ok) {
      throw new Error('Falha na comunicação com o servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error;
  }
};
