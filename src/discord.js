import { Client, GatewayIntentBits } from "discord.js";
import { sendToTelex } from "./telex.js";
import { discordToken, discordChannelId } from "./config.js";

// Create a new Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Required to interact with servers
    GatewayIntentBits.GuildMessages, // Required to receive messages
    GatewayIntentBits.MessageContent, // Required to access message content
  ],
});

// When the bot is ready
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag} and listening for messages...`);
});

// Listen for new messages in Discord
client.on("messageCreate", async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  console.log(`📩 New message in #${message.channel.name}: ${message.content}`);

  // Check if the message is from the target channel
  if (message.channelId === discordChannelId) {
    const formattedMessage = [
      {
        username: message.author.username,
        content: message.content,
        timestamp: message.createdAt.toISOString(),
      },
    ];

    // Send the message immediately to Telex
    await sendToTelex(formattedMessage);
  }
});

// Log in to Discord
client.login(discordToken);
