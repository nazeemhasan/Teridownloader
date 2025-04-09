const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const app = express();

const token = '7561036918:AAF0ZbR_w6rQ2mjrsG3ilUpLsazjpqZEKSc';
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text && text.includes("terabox.com")) {
    bot.sendMessage(chatId, "Processing your Terabox link...");

    try {
      const apiUrl = `https://terabox-api.onrender.com/api?link=${encodeURIComponent(text)}`;
      const res = await axios.get(apiUrl);

      if (res.data.status === true) {
        const videoLink = res.data.data.videoUrl;
        bot.sendMessage(chatId, `Download link:\n${videoLink}`);
      } else {
        bot.sendMessage(chatId, "Invalid link or file not found.");
      }
    } catch (err) {
      console.error(err.message);
      bot.sendMessage(chatId, "An error occurred while fetching the video.");
    }
  } else {
    bot.sendMessage(chatId, "Please send a valid Terabox link.");
  }
});

app.get("/", (req, res) => {
  res.send("Teridownloader bot is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
