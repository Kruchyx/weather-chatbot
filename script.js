const API_KEY = "1eca71e3778b478ab180bfaf008e6944";

function addMessage(message, sender, save = true) {
    const chatBox = document.getElementById("chat-box");

    const div = document.createElement("div");
    div.classList.add(sender);
    div.innerText = message;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (save) {
        saveMessage(message, sender);
    }

    return div;
}

function saveMessage(message, sender) {
    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];

    history.push({
        message: message,
        sender: sender
    });

    localStorage.setItem("chatHistory", JSON.stringify(history));
}

function loadMessages() {
    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];

    history.forEach(item => {
        addMessage(item.message, item.sender, false);
    });
}

function clearChat() {
    localStorage.removeItem("chatHistory");

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    addMessage("Cześć! Podaj pogodę lub nazwę miasta.", "bot-message");
}

function createRecommendation(temp, weather) {
    let recommendation = "";

    if (temp <= 0) {
        recommendation += "🥶 Załóż zimową kurtkę, czapkę, szalik, rękawiczki i ciepłe buty. ";
    } else if (temp < 10) {
        recommendation += "🧥 Załóż ciepłą kurtkę, długie spodnie i pełne buty. ";
    } else if (temp < 18) {
        recommendation += "👕 Wybierz bluzę lub lekką kurtkę. ";
    } else if (temp < 25) {
        recommendation += "😎 Wystarczy lekka bluza albo koszulka z długim rękawem. ";
    } else {
        recommendation += "☀️ Załóż lekką koszulkę, krótkie spodenki i pij dużo wody. ";
    }

    if (weather.includes("rain") || weather.includes("drizzle")) {
        recommendation += "☔ Zabierz parasol lub kurtkę przeciwdeszczową.";
    }

    if (weather.includes("snow")) {
        recommendation += "❄️ Załóż wodoodporne buty.";
    }

    return recommendation;
}

async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            return `❌ Błąd API: ${errorData.message}`;
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const weatherMain = data.weather[0].main.toLowerCase();

        const recommendation = createRecommendation(temperature, weatherMain);

        return `🌍 ${data.name}: ${temperature}°C, ${description}. ${recommendation}`;
    } catch (error) {
        return "❌ Nie udało się połączyć z API.";
    }
}

function botResponse(userInput) {
    const text = userInput.toLowerCase();

    if (text.includes("deszcz") && text.includes("zimno")) {
        return "🌧️ Jest zimno i pada deszcz. Załóż kurtkę przeciwdeszczową i zabierz parasol.";
    }

    if (text.includes("deszcz")) {
        return "☔ Załóż kurtkę przeciwdeszczową i zabierz parasol.";
    }

    if (text.includes("śnieg")) {
        return "❄️ Załóż zimową kurtkę, czapkę, szalik i rękawiczki.";
    }

    if (text.includes("upał") || text.includes("gorąco")) {
        return "☀️ Załóż lekką koszulkę, krótkie spodenki i pij dużo wody.";
    }

    if (text.includes("wiatr")) {
        return "🌬️ Przyda się kurtka chroniąca przed wiatrem.";
    }

    if (text.includes("7 stopni") || text.includes("7°")) {
        return "🧥 Jest chłodno. Załóż ciepłą kurtkę i pełne buty.";
    }

    return null;
}

async function sendMessage() {
    const input = document.getElementById("user-input");
    const userText = input.value.trim();

    if (userText === "") {
        return;
    }

    addMessage(userText, "user-message");
    input.value = "";

    const typingMessage = addMessage("Bot pisze...", "bot-message", false);

    setTimeout(async () => {
        typingMessage.remove();

        const localResponse = botResponse(userText);

        if (localResponse) {
            addMessage(localResponse, "bot-message");
        } else {
            const weatherResponse = await getWeather(userText);
            addMessage(weatherResponse, "bot-message");
        }
    }, 700);
}

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

loadMessages();