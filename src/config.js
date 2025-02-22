import dotenv from "dotenv";
dotenv.config();

console.log("DISCORD_TOKEN:", process.env.DISCORD_TOKEN ? "Token exists" : "Token is missing");
console.log("TELEX_WEBHOOK:", process.env.TELEX_WEBHOOK);
console.log("DISCORD_CHANNEL_ID:", process.env.DISCORD_CHANNEL_ID);

export const discordToken = process.env.DISCORD_TOKEN;
export const telexWebhook = process.env.TELEX_WEBHOOK;
export const discordChannelId = process.env.DISCORD_CHANNEL_ID;
export const fetchInterval = parseInt(process.env.FETCH_INTERVAL) || 60000;
export const maxMessages = parseInt(process.env.MAX_MESSAGES) || 10;
export const port = process.env.PORT || 3000;