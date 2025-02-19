require("dotenv").config();
import { fetchMessages } from "./discord";
import { sendToTelex } from "./telex";

const POLLING_INTERVAL = 60 * 1000; // 1 minute

async function run() {
  console.log("Starting Discord → Telex integration...");
  setInterval(async () => {
    const messages = await fetchMessages();
    if (messages.length > 0) {
      for (const message of messages) {
        await sendToTelex(message);
      }
    }
  }, POLLING_INTERVAL);
}

run();
