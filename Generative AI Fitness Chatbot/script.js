const chatWindow = document.querySelector(".chat-window");
const inputField = document.querySelector("input[type='text']");
const sendButton = document.querySelector("button");

sendButton.addEventListener("click", () => sendMessage());

async function sendMessage() {
    const userMessage = inputField.value.trim();
    if (userMessage === "") return;

    displayMessage(userMessage, "user-message");
    inputField.value = "";

    // Send the message to the FastAPI backend
    const response = await fetch(`http://127.0.0.1:8001/chat?user_message=${encodeURIComponent(userMessage)}&username=test_user`);
    const data = await response.json();

    // Display the chatbot's response
    displayMessage(data.response, "hercules-message");
}

function displayMessage(text, className) {
    const message = document.createElement("div");
    message.classList.add("message", className);
    message.innerText = text;
    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
