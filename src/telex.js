import axios from "axios";
import { telexWebhook } from "./config.js";

const sendToTelex = async (messages) => {
  if (!messages.length) {
    console.log("⚠️ No new messages to send.");
    return;
  }

  // Group messages by username
  const groupedMessages = messages.reduce((acc, msg) => {
    if (!acc[msg.username]) acc[msg.username] = [];
    acc[msg.username].push(`- ${msg.content}`);
    return acc;
  }, {});

  // Format messages with each user’s messages appearing under their name
  const formattedMessages = Object.entries(groupedMessages)
    .map(([username, msgs]) => `${username}:\n${msgs.join("\n")}`)
    .join("\n\n");

  // Take the last message details dynamically
  const lastMessage = messages[messages.length - 1];

  const payload = {
    event_name: "Discord Messages",
    message: formattedMessages,
    status: "success",
    username: lastMessage.username,
    timestamp: lastMessage.timestamp,
  };

  console.log("🚀 Sending payload to Telex:\n", JSON.stringify(payload, null, 2));

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
