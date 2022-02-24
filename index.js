const discord = require('discord.js');
const fs = require('fs');
const { Client, Intents} = require('discord.js');
const client = new discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json');
const keepAlive = require('./server.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

require("discord-buttons")(client);

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.queue = new Map();


const Categories = ["study"]; //Commands => Category => Command

Categories.forEach(async function(Category) { //
    fs.readdir(`./commands/${Category}`, async function(error, files) {
      if (error) throw new Error(`Error In Command - Command Handler\n${error}`);
      files.forEach(async function(file) {
        if (!file.endsWith(".js")) throw new Error(`A File Does Not Ends With .js - Command Handler!`);
        let command = require(`./commands/${Category}/${file}`);
   
        if (!command.name || !command.aliases) throw new Error(`No Command Name & Command Aliases In A File - Command Handler!`);
        if (command.name) client.commands.set(command.name, command);
        if (command.aliases) command.aliases.forEach(aliase => client.aliases.set(aliase, command.name));
        if (command.aliases.length === 0) command.aliases = null;
      });
    });
});

client.on("message", async message => {


  let Prefix = config.prefix

  if (message.author.bot || !message.guild || message.webhookID) return;

  if (!message.content.startsWith(Prefix)) return;

  let args = message.content.slice(Prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));


  if (command) {
    command.run(client, message, args);
  };
  if (command == 'alarm'){
    client.commands.get('alarm').execute(client, message, args);
  }
})

client.on('ready' , () =>{
 
client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  client.user.setActivity('Chats', { type: 'LISTENING' })
});

client.on("message", async message => {
if (message.mentions.has(client.user)) {
      message.channel.send(`${message.author}  I am too smart for you to mention! Just type "help" and I will help you.`);  }
if (message.channel.id == '') //Set your channel ID here~
{
if (message.author.bot) return;
  message.channel.startTyping();
if (!message.content) return message.channel.send("Please say something.");
try{
    let reply = await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=tf&botname=${client.user.username}&ownername=GoomyForLife`);
  // Alternative: http://api.brainshop.ai/get?bid=163835&key=aGBrH0F5MINk8qoF&uid=${message.author.id}&msg=${encodeURIComponent(message.content)}
        if (reply) {
            reply = await reply.json();
            message.channel.send({
                content: reply.message, // If you used the alternative link, change this to reply.cnt
            })
        }
        message.channel.stopTyping();
    } catch (error) {
        console.log(error.stack);
}}
})})

keepAlive();
client.login(process.env.TOKEN).catch(err => console.log(`Invalid Token Provided!`));
