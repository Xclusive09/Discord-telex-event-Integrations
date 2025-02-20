import dotenv from "dotenv";
dotenv.config();

export const discordToken = process.env.DISCORD_TOKEN;
export const telexWebhook = process.env.TELEX_WEBHOOK;
export const discordChannelId = process.env.DISCORD_CHANNEL_ID;
export const fetchInterval = parseInt(process.env.FETCH_INTERVAL) || 300000;
export const maxMessages = parseInt(process.env.MAX_MESSAGES) || 10;
export const port = process.env.PORT || 3000;
