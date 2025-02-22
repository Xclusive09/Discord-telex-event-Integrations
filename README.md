# Discord to Telex Integration

## Overview
This project is a Node.js-based integration that forwards messages from a Discord channel to a Telex webhook at regular intervals. It fetches messages from a specified Discord channel, filters out bot messages, and sends the collected messages to Telex every 5 minutes.

## Features
- Fetches messages from a Discord channel
- Filters out bot messages
- Sends messages to Telex
- Runs on a scheduled interval

## Setup

### 1. Create a Discord Bot
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create a new application and add a bot to it.
3. Copy the bot token and invite the bot to your server with the necessary permissions.

### 2. Set Up Environment Variables
Create a `.env` file in the root of your project and add the following environment variables:

```plaintext
DISCORD_TOKEN=your_discord_bot_token
TELEX_WEBHOOK=https://ping.telex.im/v1/webhooks/your_telex_webhook_id
DISCORD_CHANNEL_ID=your_discord_channel_id
FETCH_INTERVAL=300000
MAX_MESSAGES=10
PORT=3000
```

### 3. Install Dependencies
Run the following command to install the necessary dependencies:

```sh
npm install
```

### 4. Run the Application
Start the application using the following command:

```sh
npm start
```

## Project Structure
src/
- `config.js`: Loads environment variables and exports configuration values.
- `index.js`: Main entry point of the application. Schedules message fetching and sending.
- `discord.js`: Handles fetching messages from Discord.
- `telex.js`: Handles sending messages to Telex.
- `server.js`: Sets up an Express server to handle webhooks and serve integration details.
- `test.js`: Script to manually test the integration by fetching messages from Discord and sending them to Telex.

## API Endpoints
- `POST /telex-webhook`: Triggers fetching messages from Discord and sending them to Telex.
- `GET /integration.json`: Serves integration details dynamically.

## Example Usage
To manually test the integration, you can run the `test.js` script:

```sh
node test.js
```

This will fetch messages from the specified Discord channel and send them to the configured Telex webhook.

## Troubleshooting

### Invalid Token Error
If you encounter an "Invalid Token" error, ensure that the `DISCORD_TOKEN` environment variable is correctly set in the `.env` file and that the token is valid.

### Messages Not Appearing on Telex
If messages are not appearing on Telex, ensure that the data being sent matches the expected format and that the Telex webhook URL is correctly configured.

## License
This project is licensed under the MIT License.

## Author
**Xclusive**