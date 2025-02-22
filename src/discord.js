import { Client, GatewayIntentBits } from "discord.js";
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

  console.log(`📩 New message from ${message.author.username}: ${message.content}`);
  messagesBuffer.push({
    username: message.author.username,
    content: message.content,
    timestamp: new Date(message.createdTimestamp), // Convert timestamp to Date object
  });
});

// Function to fetch messages from the buffer
const fetchMessages = async () => {
  const now = new Date();
  const fiveMinutesAgo = new Date(now - 5 * 60 * 1000); // 5 minutes ago

  // Get messages from the last 5 minutes
  const recentMessages = messagesBuffer.filter(
    (msg) => msg.timestamp >= fiveMinutesAgo
  );

  // Remove old messages from the buffer
messagesBuffer = [];

  console.log(`Fetched ${recentMessages.length} messages from the buffer.`);
  return recentMessages;
};

client.login(discordToken);

export { fetchMessages };