const Discord = require("discord.js");
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

module.exports.run = async (bot, message, args) => {
  mongoose.model("DiscordUserData").findOne ({
    userID: `${message.author.id}`
  }, function(error, data) {
    if (error) {
      console.log("Failed to get data :(");
      console.log(error);
    } else {
      console.log("Successfully got the user's SparkCoin amount: " + data.sparkcoins);
      let wcolour = "";
      if (data.col === "not-set") {
        wcolour = "202225";
      } else {
        wcolour = data.col;
      }
      let coins = data.sparkcoins;
      let wicon = message.author.displayAvatarURL;
      let wlltembed = new Discord.RichEmbed()
      .setColor(`#${wcolour}`)
      .setAuthor(`💳 ${message.author.username}'s Wallet`, wicon)
      .setDescription(`You have ${coins} SparkCoins.`);
      return message.channel.send(wlltembed);
    }
  });
}

module.exports.help = {
  name: "w"
}
