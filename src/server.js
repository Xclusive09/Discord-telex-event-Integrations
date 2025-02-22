import express, { json } from "express";
import cors from "cors";
import { fetchMessages as fetchDiscordMessages } from "./discord.js";
import { sendToTelex } from "./telex.js";
import { port } from "./config.js";

const app = express();
app.use(cors()); // Enable CORS
app.use(json());

app.post("/telex-webhook", async (req, res) => {
  console.log("📩 Webhook triggered, fetching messages...");
  const messages = await fetchDiscordMessages();
  await sendToTelex(messages);
  res.json({ success: true, message: "Data sent to Telex" });
});

// Serve integration.json dynamically
app.get("/integration.json", (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const integrationJson = {
    "data": {
      "date": {
        "created_at": "2025-02-19",
        "updated_at": "2025-02-19"
      },
      "descriptions": {
        "app_name": "discord-events-notification",
        "app_description": "Sends Discord channel messages to Telex at regular intervals for monitoring and logging.\n",
        "app_logo": "https://trybex.com.ng/assets/images/Component%203.png",
        "app_url": "https://discord-telex-event-integrations.onrender.com",
        "background_color": "#fff"
      },
      "is_active": true,
      "integration_type": "interval",
      "key_features": [
        "Discord Webhooks",
        "Scheduled Notifications",
        "Event Monitoring",
        "Automation"
      ],
      "author": "xclusive", 
      "integration_category": "Communication & Collaboration",
      "settings": [
        {
          "label": "Time Interval",
          "type": "dropdown",
          "required": true,
          "default": "5 minutes\t",
          "options": [
            "5 minutes",
            "10 minutes",
            "20 minutes"
          ]
        },
        {
          "label": "Discord Channel ID\t",
          "type": "text",
          "required": true,
          "default": "1340417957297389669"
        },
        {
          "label": "Event Type\t",
          "type": "multi-checkbox",
          "required": true,
          "default": "message_mention",
          "options": [
            "message_mention",
            "role_mention",
            "server_event",
            "reaction_added"
          ]
        },
        {
          "label": "Include Bot Messages",
          "type": "checkbox",
          "required": true,
          "default": "true"
        },
        {
          "label": "Max Messages Per Fetch",
          "type": "number",
          "required": true,
          "default": "10"
        }
      ],
      "target_url": " https://discord.com/api/webhooks/1341793920920719381/9J_sN5LTn_W5tI_2AfVDc_XV0RDZT6nDAr2JSX_Q7bX6FaGzFjwmxC0w874vnPqlRDy2",
      "tick_url": "https://discord-telex-event-integrations.onrender.com/telex-webhook"
    }
  };
  res.json(integrationJson);
});

// Start Express server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

export default app;