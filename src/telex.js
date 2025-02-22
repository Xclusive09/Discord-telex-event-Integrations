import axios from "axios";
import { telexWebhook } from "./config.js";

const sendToTelex = async (messages) => {
  if (!messages.length) {
    console.log("⚠️ No new messages to send.");
    return;
  }

  // Take the last message details dynamically
  const lastMessage = messages[messages.length - 1];

  // Format payload as a single object instead of an array
  // const payload = {
  //   event_name: "Discord Messages",
  //   username: lastMessage.username, // ✅ Sending single username
  //   content: lastMessage.content,   // ✅ Sending single message content
  //   timestamp: lastMessage.timestamp, // ✅ Sending single timestamp
  // };
  const payload = {
    event_name: "Discord Messages",
    message: lastMessage.content,  // ✅ Send only the message string
    status: "success",
    username: lastMessage.username,
    timestamp: lastMessage.timestamp,
  };
  

  console.log("🚀 Sending payload to Telex as an object:\n", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(telexWebhook, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(`✅ Message sent to Telex! Response: ${response.status}`);
  } catch (error) {
    console.error("❌ Error sending message to Telex:", error.response?.data || error.message);
  }
};

export { sendToTelex };
