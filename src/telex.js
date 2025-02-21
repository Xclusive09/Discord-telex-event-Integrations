import axios from "axios";
import { telexWebhook } from "./config.js";

const sendToTelex = async (messages) => {
  if (!messages.length) {
    console.log("⚠️ No new messages to send.");
    return;
  }

  // Format messages into a string for better readability
  const formattedMessages = messages.map(msg => `${msg.username}: ${msg.content}`).join("\n");

  // Take the latest message's details dynamically
  const lastMessage = messages[messages.length - 1];

  const payload = {
    event_name: "Discord Message", // Generic event name
    message: formattedMessages, // All messages formatted
    status: "success",
    username: lastMessage.username, // Use the last sender’s username
    timestamp: lastMessage.timestamp // Add timestamp from Discord
  };

  console.log("🚀 Sending payload to Telex:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(telexWebhook, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ Messages sent to Telex! Response: ${response.status}`);
  } catch (error) {
    console.error("❌ Error sending messages to Telex:", error.response?.data || error.message);
  }
};

export { sendToTelex };
