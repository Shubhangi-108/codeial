document.addEventListener("DOMContentLoaded", function() {
    console.log('hello')
    const toggleChatButton = document.getElementById('toggle-chat');
    const chatBox = document.getElementById('user-chat-box');

    toggleChatButton.addEventListener('click', function() {
        chatBox.classList.toggle('hidden');
    });
});