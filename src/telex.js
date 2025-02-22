import axios from "axios";
import { telexWebhook } from "./config.js";

const sendToTelex = async (messages) => {
  if (!messages.length) {
    console.log("⚠️ No new messages to send.");
    return;
  }

  // Convert messages to a formatted string
  const formattedMessages = messages
    .map((msg) => `${msg.username}: ${msg.content}`)
    .join("\n"); // Join messages into a single string with line breaks

  const payload = {
    event_name: "Discord Messages",
    messages: formattedMessages,
    username: "Discord Bot",  // ✅ Send all messages as a single formatted string
    status: "success",
  };

  console.log("🚀 Sending payload to Telex as an object:\n", JSON.stringify(payload, null, 2));

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
