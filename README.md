# Discord to Telex Integration

## Overview
A Node.js-based integration that forwards messages from a Discord channel to a Telex webhook.

## Features
- Fetches messages from a Discord channel
- Filters out bot messages
- Sends messages to Telex
- Runs on a scheduled interval

## Setup

### 1. Create a Discord Bot
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a bot and copy the bot token
3. Add the bot to your server

### 2. Set Up Environment Variables
Create a `.env` file:
