// Funções de utilidade para o componente ChatWidget

// Formatar hora atual
export const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Gerar um ID de sessão único
export const generateSessionId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000000);
  return parseInt(timestamp.toString() + randomNum.toString());
};

// Obter ID de sessão armazenado ou criar um novo
export const getSessionId = () => {
  const storedId = localStorage.getItem('gao_chat_session_id');
  if (storedId) {
    return storedId;
  } else {
    const newId = generateSessionId();
    localStorage.setItem('gao_chat_session_id', newId);
    return newId;
  }
};
