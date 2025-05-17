const apiBase = "https://wasa-backend.onrender.com";
const walletAddressElement = document.getElementById("walletAddress");
const statusElement = document.getElementById("status");
const logElement = document.getElementById("log");

document.getElementById("connectWallet").addEventListener("click", () => {
    walletAddressElement.innerText = "Wallet: H4JDBw8UD7o7Tk2HGoEKrrTr94YPNvAT6ajhPRUdAQ1";
    appendLog("Wallet ansluten.");
});

document.getElementById("startBot").addEventListener("click", async () => {
    const budget = document.getElementById("budget").value;
    const strategy = document.getElementById("strategy").value;
    appendLog("Startar bot...");
    try {
        const res = await fetch(`${apiBase}/start-bot`, { method: "POST" });
        if (res.ok) {
            statusElement.innerText = "Botstatus: Aktiv";
            appendLog("Bot startad.");
        } else {
            throw new Error();
        }
    } catch {
        appendLog("Misslyckades kontakta backend.");
    }
});

document.getElementById("stopBot").addEventListener("click", async () => {
    appendLog("Stoppar bot...");
    try {
        const res = await fetch(`${apiBase}/stop-bot`, { method: "POST" });
        if (res.ok) {
            statusElement.innerText = "Botstatus: Offline";
            appendLog("Bot stoppad.");
        } else {
            throw new Error();
        }
    } catch {
        appendLog("Misslyckades kontakta backend.");
    }
});

function appendLog(message) {
    const time = new Date().toLocaleTimeString();
    logElement.innerText += `[${time}] ${message}\n`;
    logElement.scrollTop = logElement.scrollHeight;
}