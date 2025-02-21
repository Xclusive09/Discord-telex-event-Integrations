import { Client, GatewayIntentBits } from "discord.js";
import { sendToTelex } from "./telex.js";
import { discordToken, discordChannelId } from "./config.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let messagesBuffer = []; // Store messages temporarily

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}, collecting messages...`);
});

// Listen for new messages
client.on("messageCreate", (message) => {
  if (message.author.bot) return; // Ignore bot messages
  if (message.channelId !== discordChannelId) return; // Only track messages from the target channel

  messagesBuffer.push({
    username: message.author.username,
    content: message.content,
    timestamp: new Date(message.createdTimestamp), // Convert timestamp to Date object
  });
});

// Function to send messages every 5 minutes
const sendMessagesEvery5Minutes = () => {
  const now = new Date();
  const fiveMinutesAgo = new Date(now - 5 * 60 * 1000); // 5 minutes ago

  // Get messages from the last 5 minutes
  const recentMessages = messagesBuffer.filter(
    (msg) => msg.timestamp >= fiveMinutesAgo
  );

  if (recentMessages.length > 0) {
    console.log(`📤 Sending ${recentMessages.length} messages to Telex...`);
    sendToTelex(recentMessages);
  } else {
    console.log("⏳ No new messages in the last 5 minutes.");
  }

  // Remove old messages from the buffer
  messagesBuffer = messagesBuffer.filter((msg) => msg.timestamp >= fiveMinutesAgo);
};

// Run the function every 5 minutes
setInterval(sendMessagesEvery5Minutes, 2 * 60 * 1000);

client.login(discordToken);
export {fetchMessages};
