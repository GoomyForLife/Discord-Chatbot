const Discord = require("discord.js"),
disbut = require("discord-buttons");

module.exports = {
  name: "hi",
  description: "Says Hi",
  usage: "hi",
  aliases: ["hello","hey","hi there",],
  permissions:[],
  cooldown: 3000,
run: async (client, message, args) => {
        message.channel.send(`${message.author}  Hello :smile:`)
        .catch(console.error);
    }
}
