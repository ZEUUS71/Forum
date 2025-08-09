const form = document.getElementById("messageForm");
const messagesDiv = document.getElementById("messages");

const API_URL = "http://localhost:3000"; // Adresse de ton serveur

// Charger les messages depuis le serveur
function loadMessages() {
    fetch(`${API_URL}/messages`)
        .then(response => response.json())
        .then(data => {
            messagesDiv.innerHTML = "";
            data.forEach(msg => {
                const messageElement = document.createElement("div");
                messageElement.classList.add("message");
                messageElement.innerHTML = `<strong>${msg.username}</strong> : ${msg.message}`;
                messagesDiv.appendChild(messageElement);
            });
        })
        .catch(err => console.error("Erreur lors du chargement des messages :", err));
}

// Envoyer un nouveau message
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const message = document.getElementById("message").value;

    fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, message })
    })
    .then(response => response.json())
    .then(data => {
        form.reset();
        loadMessages(); // Recharge la liste des messages
    })
    .catch(err => console.error("Erreur lors de l'envoi du message :", err));
});

// Charger les messages au démarrage
loadMessages();
