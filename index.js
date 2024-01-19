require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { regsiterCommand } = require("./register-commands");

try {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.commands = new Collection();

  client.on("ready", (message) => {
    console.log("Bot is ready");
  });
  client.login(process.env.TOKEN);

  regsiterCommand(client);
} catch (error) {}
