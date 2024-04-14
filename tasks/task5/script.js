const messageInput = document.querySelector(".message-input");
const sendButton = document.querySelector(".send-button");
const geoButton = document.querySelector(".geo-button");
const chatMessages = document.querySelector(".chat-messages");

const ws = new WebSocket("wss://echo-ws-service.herokuapp.com/");

function addMessageToChat(message, className) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add("message", className);
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message !== "") {
    ws.send(message);
    addMessageToChat("Я: " + message, "me");
    messageInput.value = "";
  }
});

geoButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        addMessageToChat(`Ваша гео-локация: ${geoLink}`, "me");
      },
      (error) => {
        console.error("Ошибка при получении гео-локации:", error);
        addMessageToChat("Информация о гео-локации недоступна", "me");
      }
    );
  } else {
    addMessageToChat("Гео-локация не поддерживается в вашем браузере", "me");
  }
});

ws.addEventListener("message", (event) => {
  const message = event.data;
  addMessageToChat(`Эхо-сервер: ${message}`, "server");
});
