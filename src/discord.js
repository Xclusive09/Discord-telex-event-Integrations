import axios from "axios";
import { discordToken, discordChannelId } from "./config.js";

const DISCORD_API_URL = `https://discord.com/api/v10/channels/${discordChannelId}/messages`;

async function fetchMessages() {
  try {
    const response = await axios.get(DISCORD_API_URL, {
      headers: { Authorization: `Bot ${discordToken}` },
    });

    const messages = response.data.filter((msg) => !msg.author.bot); // Ignore bot messages

    console.log(`Fetched ${messages.length} messages.`);
    return messages.map((msg) => ({
      username: msg.author.username,
      content: msg.content,
      timestamp: msg.timestamp,
    }));
  } catch (error) {
    console.error("❌ Error fetching messages from Discord:", error.response?.data || error.message);
    return [];
  }
}

export { fetchMessages };
