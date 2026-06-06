function addMessage(message, sender) {

    const chatBox = document.getElementById("chat-box");

    const div = document.createElement("div");

    div.classList.add(sender);

    div.innerText = message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}


function botResponse(userInput) {

    const text = userInput.toLowerCase();

    if (
        text.includes("deszcz")
    ) {
        return "☔ Załóż kurtkę przeciwdeszczową i zabierz parasol.";
    }

    else if (
        text.includes("śnieg")
    ) {
        return "❄️ Załóż zimową kurtkę, czapkę i rękawiczki.";
    }

    else if (
        text.includes("upał")
    ) {
        return "☀️ Lekka koszulka, krótkie spodenki i dużo wody.";
    }

    else if (
        text.includes("wiatr")
    ) {
        return "🌬️ Przyda się kurtka chroniąca przed wiatrem.";
    }

    else if (
        text.includes("7 stopni")
    ) {
        return "🧥 Jest chłodno. Załóż ciepłą kurtkę i pełne buty.";
    }

    else {
        return "🤖 Podaj więcej informacji o pogodzie, np. temperaturę lub opady.";
    }
}


function sendMessage() {

    const input = document.getElementById("user-input");

    const userText = input.value.trim();

    if (userText === "") {
        return;
    }

    addMessage(userText, "user-message");

    const response = botResponse(userText);

    setTimeout(() => {

        addMessage(response, "bot-message");

    }, 500);

    input.value = "";
}