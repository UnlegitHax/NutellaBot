const Discord = require("discord.js");
const superagent = require("superagent");

const PREFIX = ";;"

var fortunes = [
    "Ja",
    "Nein",
    "Villeicht",
    "Keine Ahnung",
    "42!",
    "Jesus",
    "Meine Quellen sagen Nein",
    "Meine Quellen sagen Ja",
    "Ich denke schon...",
    "Konzentriere dich und frage nochmal!",
    "Kakao"
];

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log(`Ich mag Nutella! ${bot.guilds.size}`);

    bot.user.setGame(";;help");
});

bot.on("message", function(message) {
    if(message.author.equals(bot.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
            var embed = new Discord.RichEmbed()
                .setTitle(":ping_pong: **Pong!**")
                .addField("Mein Ping", bot.ping + "ms")
                .setColor(0x2ecc71)
            message.channel.sendEmbed(embed)
            break;
        case "info":
            message.channel.sendMessage("Ich bin ein Bot der Nutella mag! Coded by UnlegitHax")
            break;
        case "8ball":
            if(args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Du hast die Frage vergessen :facepalm:");
            break;
        case "help":
            var embed = new Discord.RichEmbed()
                .addField(";;help", "Sendet diese Liste")
                .addField(";;ping", "Pong!")
                .addField(";;info", "Zeigt eine kleine Info an")
                .addField(";;8ball <Frage>", "Antwortet zufällig (Antworten treffen nicht immer zu!)")
                .addField(";;noticeme", "Mentioned dich und fragt ob du Nutella magst xD")
                .addField(";;pong", "Ping!")
                .addField(";;lenny", "( ͡° ͜ʖ ͡°)")
                .addField(";;owner", "Sendet den Owner und die Sozialen Medien von ihm")
                .addField(";;ban", "Bannt den in der Nachricht erwähnten User")
                .addField(";;kick", "Kickt den in der Nachricht erwähnten User")
                .addField(";;invite", "Sendet den Bot Invite")
                .setColor(0x8e44ad)
                .setFooter("Das sind alle Commands die es zur Zeit gibt!")
            message.channel.sendEmbed(embed)
            break;
        case "noticeme":
            message.channel.sendMessage(message.author.toString() + " Magst du Nutella?");
            break;
        case "pong":
            message.channel.sendMessage("Ping!")
            break;
        case "lenny":
            message.channel.sendMessage("( ͡° ͜ʖ ͡°)")
            break;
        case "owner":
            var embed = new Discord.RichEmbed()
                .setDescription("Dies ist der Bot von UnlegitHax! Abonniere ihn doch auf YouTube: https://www.youtube.com/channel/UCTsuPmKNW6n2ABax7UVb0Uw")
            message.channel.sendEmbed(embed);
        case "botinfo":
            var embed = new Discord.RichEmbed()
                .setDescription("Bot Info")
                .setColor(0x1abc9c)
                .setThumbnail(bot.user.displayAvatarURL)
                .addField("Bot Name", bot.user.username)
                .addField("Erstellt am", bot.user.createdAt)
                .addField("Mein derzeitiger Ping", bot.ping + "ms")
            message.channel.sendEmbed(embed)
            break;
        case "userinfo":
            var embed = new Discord.RichEmbed()
                .setDescription("User Info")
                .setColor(0x1abc9c)
                .setThumbnail(message.author.displayAvatarURL)
                .addField("User Name", message.author.username)
                .addField("Beigetreten am", message.author.createdAt)
                .addField("Avatar URL", message.author.avatarURL)
            message.channel.sendEmbed(embed)
            break;
        case "serverinfo":
            var sicon = message.guild.iconURL
            var embed = new Discord.RichEmbed()
                .setDescription("Server Info")
                .setColor(0x1abc9c)
                .setThumbnail(sicon)
                .addField("Server Name", message.guild.name)
                .addField("Erstellt am", message.guild.createdAt)
                .addField("Du bist beigetreten am", message.member.joinedAt)
                .addField("Member Anzahl", message.guild.memberCount)
                .addField("Owner", message.guild.owner)
            message.channel.sendEmbed(embed)
            break;
        case "ban":
            if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Du hast nicht die Berechtigung diesen Command auszuführen");
            const member = message.mentions.members.first();
            if (!member) return message.reply("Falsche Verwendung, bitte mache `;;ban @Member#1234`!")
            member.ban({
                reason: `Banned by ${message.author.tag}`
            });
            break;
        case "kick":
            if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Du hast nicht die Berechtigung diesen Command auszuführen");
            const member1 = message.mentions.members.first();
            if (!member1) return message.reply("Falsche Verwendung, bitte mache `;;kick @Member#1234`!")
            member1.kick({
                reason: `Kicked by ${message.author.tag}`
            });
            break;
        case "invite":
            var embed = new Discord.RichEmbed
                .addField("Bot Invite", "https://discordapp.com/oauth2/authorize?client_id=434781046152626207&scope=bot&permissions=2146958591")
                .setColor(0x2ecc71)
                .setThumbnail(bot.user.displayAvatarURL)
            message.channel.sendEmbed(embed)
        default:
            message.channel.sendMessage("Dieser Command existiert nicht!")
    }
});

bot.login(process.env.TOKEN);
