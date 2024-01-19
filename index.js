require("dotenv").config();
const express = require("express");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { regsiterCommand } = require("./register-commands");

const app = express();
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index.ejs");
});

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

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
