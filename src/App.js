import React from 'react';
import './App.css';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <div className="App">
      <h1>Página de Exemplo</h1>
      <p>Esta é uma página de exemplo para demonstrar o widget de chat integrado.</p>
      <p>Você pode remover este conteúdo ao integrar o widget em seu site.</p>
      
      {/* O componente ChatWidget pode ser facilmente importado e usado em qualquer aplicação React */}
      <ChatWidget />
    </div>
  );
}

export default App;
