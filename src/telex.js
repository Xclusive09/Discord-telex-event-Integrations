import axios from "axios";
import { telexWebhook } from "./config.js";

const sendToTelex = async (messages) => {
  if (!messages.length) {
    console.log("⚠️ No new messages to send.");
    return;
  }

  // Convert messages to an array of strings
  const formattedMessages = messages.map(
    (msg) => `${msg.username}: ${msg.content}`
  );

  const payload = {
    event_name: "Discord Messages",
    messages: formattedMessages, // ✅ Send as an array inside an object
    status: "success",
    timestamp: new Date().toISOString(),
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
