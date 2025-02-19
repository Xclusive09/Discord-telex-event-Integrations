const axios = require("axios");

const DISCORD_API_URL = `https://discord.com/api/v10/channels/${process.env.DISCORD_CHANNEL_ID}/messages`;

async function fetchMessages() {
  try {
    const response = await axios.get(DISCORD_API_URL, {
      headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
    });

    const messages = response.data.filter((msg) => !msg.author.bot); // Ignore bot messages

    console.log(`Fetched ${messages.length} messages.`);
    return messages.map((msg) => ({
      username: msg.author.username,
      content: msg.content,
      timestamp: msg.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching messages:", error.response?.data || error.message);
    return [];
  }
}

module.exports = { fetchMessages };
