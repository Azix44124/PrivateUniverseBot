const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("Masturbiram", {type: "WATCHING"});

});

bot.on('message', message => {
  // If the message is "ping"
  if (message.content === 'p!ddos') {
    // Send "pong" to the same channel
    message.channel.send('**Nisam napravljen za to!**');
  }
});

bot.on('message', message => {
  // If the message is "ping"
  if (message.content === 'p!protect') {
    // Send "pong" to the same channel
    message.channel.send('Necu hvala');
  }
});

bot.on('message', message => {
  // If the message is "ping"
  if (message.content === 'p!staff') {
    // Send "pong" to the same channel
    message.channel.send('Jedini dobri su Allowed, Azix :3, Aki, AuxMute, Moonlight, Dr.50n3, **za ostale se neprica**');
  }

});



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.login(tokenfile.token);
