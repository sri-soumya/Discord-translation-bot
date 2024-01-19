const { SlashCommandBuilder } = require("discord.js");
const { categories } = require("../../utils/supported-languages");
const { translateLanguage } = require("../../utils/translate-api");

let data = new SlashCommandBuilder()
  .setName("translate")
  .setDescription("Translates a given text from one language to another")
  .addStringOption((option) =>
    option
      .setName("text")
      .setDescription("Text to be translated")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("to")
      .setDescription("Target language")
      .setRequired(true)
      .setAutocomplete(true)
  )
  .addStringOption((option) =>
    option
      .setName("from")
      .setDescription("Source language")
      .setAutocomplete(true)
  );

async function execute(interaction) {
  const text = interaction.options.getString("text");
  const to = interaction.options.getString("to");
  const from = interaction.options.getString("from");
  const reply = await translateLanguage(text, to, from);
  await interaction.reply(reply);
}

async function autocomplete(interaction) {
  const focusedValue = interaction.options.getFocused();
  const filtered = categories.filter((choice) =>
    choice.name.toLowerCase().startsWith(focusedValue.toLowerCase())
  );
  await interaction.respond(filtered.splice(0, 25));
}
module.exports = {
  data,
  execute,
  autocomplete,
};
