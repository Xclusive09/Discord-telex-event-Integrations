import { fetchMessages } from "./src/discord.js";
import { sendToTelex } from "./src/telex.js";

async function testIntegration() {
  console.log("🔍 Fetching messages from Discord...");
  const messages = await fetchMessages();

  console.log("🚀 Sending messages to Telex...");
  await sendToTelex(messages);
}

testIntegration();
