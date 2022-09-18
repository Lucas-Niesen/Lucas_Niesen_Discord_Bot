const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

var http = require('http');

var axios = require('axios');


var port = '8000';
var host = '0.0.0.0';


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const Database = require("@replit/database")
const db = new Database()
require("replit-dis-uniter")(client);


//var send_channel = "general"
var Channel_send_bot_commands
var Channel_discord_bot

client.once("ready", () => {
  console.log("Ik ben wakker")
  client.user.setActivity("Lucas Niesen Meldingen");
  //Channel_a = client.channels.cache.get('1012094415310946334');
  //Channel_general = client.channels.cache.get('503466571184734212');
  Channel_discord_bot = client.channels.cache.get('1014054782220128286');
  Channel_send_bot_commands = client.channels.cache.get('974941799481221141');
  Channel_send_bot_commands.send("Start")

});





/*var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {
  axios
    .get('https://smschecklessenrooster.lucasniesen.repl.co/value/')
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      console.log(res.data);
      db.get("last_val").then(value => {
        console.log(value)
        if (res.data == 0 && value != 0) {
          db.set("last_val", "0");
        } else if (res.data == 1 && value != 1) {
          Channel_discord_bot.send("@everyone De lesseroosters zijn klaar.");
          db.set("last_val", "1");
        }
      });

    })
    .catch(error => {
      console.error(error);
      Channel_send_bot_commands.send("@everyone error.");
    });

}, the_interval);*/

client.on("messageCreate", message => {
  //console.log(message);
  if (message.channelId == Channel_send_bot_commands.id) {
    if (message.content.startsWith("!send ")) {
      Channel_discord_bot.send(message.content.replace('!send ', ''));
    }
    if (message.content.startsWith("!set alert")) {
      const row = new ActionRowBuilder()
        .addComponents(
          new SelectMenuBuilder()
            .setCustomId('alert')
            .setPlaceholder('Selecteer het alert!')
            .addOptions(
              {
                label: 'SMS_Check_onderhoudsmodus',
                value: 'SMS_Check_onderhoudsmodus'
              },
              {
                label: 'SMS_Klassenleraaren',
                value: 'SMS_Klassenleraaren',
              },
              {
                label: 'SMS_Check_Lessenrooster',
                value: 'SMS_Check_Lessenrooster'
              },
            ),
        );

      message.reply({ components: [row] });
    }

  }
});

client.on('interactionCreate', async interaction => {

  if (interaction.isButton()) {
    if (interaction.customId === "AlertButtonSMS_Check_LessenroosterTrue") {
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('SMS_Alert')
        .setAuthor({ name: 'Lucas Niesen Meldingen', iconURL: 'https://i.imgur.com/GAyDQsD.png' })
        .setDescription('Als de lessenroosters klaar zijn zal er een bericht worden gestuud.')
        .setThumbnail('https://i.imgur.com/GAyDQsD.png')
        .setTimestamp()
        .setFooter({ text: 'Lucas Niesen Meldingen Bot', iconURL: 'https://i.imgur.com/GAyDQsD.png' });
      Channel_discord_bot.send({ content: '@everyone', embeds: [exampleEmbed] });
      interaction.reply("succes");
    } else if (interaction.customId == "AlertButtonSMS_Check_LessenroosterFalse") {
      interaction.reply("canceled");
    }
  }

  const { customId, values, member } = interaction;

  if (customId === 'alert') {

    const component = interaction.component;

    const removed = component.options.filter((option) => {
      return values.includes(option.value)
    });

    if (removed[0].value == 'SMS_Check_onderhoudsmodus') {
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('SMS_Alert')
        .setAuthor({ name: 'Lucas Niesen Meldingen', iconURL: 'https://i.imgur.com/GAyDQsD.png' })
        .setDescription('Als smartschool uit onderhoudsmodus is zal er een bericht gestuud worden.')
        .setThumbnail('https://i.imgur.com/GAyDQsD.png')
        .setTimestamp()
        .setFooter({ text: 'Lucas Niesen Meldingen Bot', iconURL: 'https://i.imgur.com/GAyDQsD.png' });
      Channel_discord_bot.send({ content: '@everyone', embeds: [exampleEmbed] });

    } else if (removed[0].value == 'SMS_Klassenleraaren') {
      const exampleEmbed1 = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('SMS_Alert')
        .setAuthor({ name: 'Lucas Niesen Meldingen', iconURL: 'https://i.imgur.com/GAyDQsD.png' })
        .setDescription('Klassenleraar 1: Dylan DESAER')
        .setThumbnail('https://userpicture20.smartschool.be/User/Userimage/hashimage/hash/m/plain/1/square/1/res/256')
        .setTimestamp()
        .setFooter({ text: 'Lucas Niesen Meldingen Bot', iconURL: 'https://i.imgur.com/GAyDQsD.png' });


      const exampleEmbed2 = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('SMS_Alert')
        .setAuthor({ name: 'Lucas Niesen Meldingen', iconURL: 'https://i.imgur.com/GAyDQsD.png' })
        .setDescription('Klassenleraar 2: Wendy WILLEMS')
        .setThumbnail('https://userpicture20.smartschool.be/User/Userimage/hashimage/hash/436_7ef0794a-70c4-439b-8eff-a4de5bc1858e/plain/1/square/1/res/256')
        .setTimestamp()
        .setFooter({ text: 'Lucas Niesen Meldingen Bot', iconURL: 'https://i.imgur.com/GAyDQsD.png' });
      Channel_discord_bot.send({ content: '@everyone', embeds: [exampleEmbed1, exampleEmbed2] });

    } else if (removed[0].value == 'SMS_Check_Lessenrooster') {

      const row1 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('AlertButtonSMS_Check_LessenroosterTrue')
            .setLabel('True')
            .setStyle(ButtonStyle.Primary),

          new ButtonBuilder()
            .setCustomId('AlertButtonSMS_Check_LessenroosterFalse')
            .setLabel('False')
            .setStyle(ButtonStyle.Primary),
        );
      Channel_send_bot_commands.send({ content: 'I think you should,', components: [row1] });
      interaction.reply("succes")
    }


  }

});











client.login(process.env.token)




