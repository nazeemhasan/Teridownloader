
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (isValidTeraboxLink(text)) {
    bot.sendMessage(chatId, "Processing your Terabox link...");

    try {
      const video = await getTeraboxVideo(text);  // risky code inside try
      bot.sendMessage(chatId, `Here's your download link: ${video.download}`);
    } catch (err) {
      console.error("Error fetching video:", err);
      bot.sendMessage(chatId, "Failed to fetch video: " + err.message);
    }
  } else {
    bot.sendMessage(chatId, "Please send a valid Terabox link.");
  }
});
