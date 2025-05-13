document.addEventListener('DOMContentLoaded', function() {
    // Selecionar o formulário e adicionar evento de envio
    const form = document.querySelector('.contato form');
    
    // Criar elementos do popup
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.style.display = 'none';
    
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    
    const popupMessage = document.createElement('p');
    popupMessage.textContent = 'Muito obrigado por deixar sua mensagem, em breve entraremos em contato.';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'btn-primary';
    closeButton.textContent = 'Fechar';
    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });
    
    // Montar estrutura do popup
    popupContent.appendChild(popupMessage);
    popupContent.appendChild(closeButton);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
    
    // Adicionar estilos CSS para o popup
    const style = document.createElement('style');
    style.textContent = `
        .popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1001;
        }
        
        .popup-content {
            background-color: #121212;
            border: 2px solid #0a192f;
            border-radius: 8px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .popup-content p {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar evento de envio ao formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Capturar valores dos campos
        const nome = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const telefone = form.querySelector('input[type="tel"]').value;
        const mensagem = form.querySelector('textarea').value;
        
        // Armazenar os dados em variáveis (poderia ser enviado para um servidor)
        const dadosFormulario = {
            nome: nome,
            email: email,
            telefone: telefone,
            mensagem: mensagem
        };
        
        // Exibir no console para verificação (opcional)
        console.log('Dados do formulário:', dadosFormulario);
        
        // Exibir o popup
        popup.style.display = 'flex';
        
        // Limpar o formulário
        form.reset();
    });
});
