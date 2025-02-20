import app from "./server.js";
import { fetchMessages as fetchDiscordMessages } from "./discord.js";
import { sendToTelex } from "./telex.js";
import { fetchInterval } from "./config.js";

// Schedule automatic message fetching
setInterval(async () => {
  console.log("⏳ Fetching Discord messages...");
  const messages = await fetchDiscordMessages();
  await sendToTelex(messages);
}, fetchInterval);
