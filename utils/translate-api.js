const deepl = require("deepl-node");
async function translateLanguage(text, to, from) {
  try {
    const authKey = process.env.AUTH_KEY;
    const translator = new deepl.Translator(authKey);
    const result = await translator.translateText(text, from, to);
    return result.text;
  } catch (error) {
    return "Error while translating, please try again.";
  }
}

module.exports = { translateLanguage };
