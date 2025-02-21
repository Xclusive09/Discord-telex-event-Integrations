import axios from "axios";
import { telexWebhook } from "./config.js";

const sendToTelex = async (messages) => {
  if (!messages.length) {
    console.log("⚠️ No new messages to send.");
    return;
  }

  // Format messages into a single string
  const formattedMessages = messages.map(msg => `${msg.username}: ${msg.content}`).join("\n");

  const payload = {
    event_name: "Discord Messages",
    message: formattedMessages,
    status: "success",
    username: "Discord Bot"
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

