function addMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");

    const div = document.createElement("div");
    div.classList.add(sender);
    div.innerText = message;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;

    return div;
}

function botResponse(userInput) {
    const text = userInput.toLowerCase();

    if (text.includes("deszcz") && text.includes("zimno")) {
        return "🌧️ Jest zimno i pada deszcz. Załóż ciepłą kurtkę przeciwdeszczową, pełne buty i zabierz parasol.";
    }

    if (text.includes("deszcz")) {
        return "☔ Załóż kurtkę przeciwdeszczową i zabierz parasol.";
    }

    if (text.includes("śnieg")) {
        return "❄️ Załóż zimową kurtkę, czapkę, szalik, rękawiczki i ciepłe buty.";
    }

    if (text.includes("upał") || text.includes("gorąco")) {
        return "☀️ Załóż lekką koszulkę, krótkie spodenki, okulary przeciwsłoneczne i pij dużo wody.";
    }

    if (text.includes("wiatr")) {
        return "🌬️ Przyda się kurtka chroniąca przed wiatrem albo bluza z kapturem.";
    }

    if (text.includes("7 stopni") || text.includes("7°")) {
        return "🧥 Jest chłodno. Załóż ciepłą kurtkę, długie spodnie i pełne buty.";
    }

    if (text.includes("mróz") || text.includes("minus")) {
        return "🥶 Jest bardzo zimno. Wybierz zimową kurtkę, czapkę, szalik, rękawiczki i ocieplane buty.";
    }

    if (text.includes("słońce") || text.includes("slonce")) {
        return "😎 Jest słonecznie. Warto założyć okulary przeciwsłoneczne i lekkie ubranie.";
    }

    return "🤖 Podaj więcej informacji o pogodzie, np. temperaturę, deszcz, śnieg, wiatr albo nazwę miasta.";
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const userText = input.value.trim();

    if (userText === "") {
        return;
    }

    addMessage(userText, "user-message");

    input.value = "";

    const typingMessage = addMessage("Bot pisze...", "bot-message");

    setTimeout(() => {
        typingMessage.remove();

        const response = botResponse(userText);
        addMessage(response, "bot-message");
    }, 700);
}

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});