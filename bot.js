import clear from './modules/clear.js';
import play from './modules/play.js';
import Discord from 'discord.js'; 
import fs from 'fs'; 
import packageConfig from './package.json';
import config from'./config.json'; 
let token = config.token; 
let prefix = config.prefix; 
import ytdl from 'ytdl-core';



const client = new Discord.Client();

client.on("ready", function(){ 
	console.log(client.user.username + " запустился!");
});

client.on("message", function(message) {
	if (message.author.bot) {return;}
	if (!message.content.startsWith(prefix)) {return;}

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	try{
		switch(command) {
		case "ping": 
			const timeTaken = Date.now() - message.createdTimestamp;
			message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
			break;

		case "sum": 
			const numArgs = args.map(x => parseFloat(x));
			const sum = numArgs.reduce((counter, x) => counter += x);
			message.reply(`The sum of all the arguments you provided is ${sum}!`);
			break;

		case "help":
			message.channel.send("Помощь");
			break;

		case "avatar":
			message.reply(message.author.displayAvatarURL());
			break;

		case "userId":
			message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
			break;
		
		case "clear":
			clear(message, args[0]);
			break;

		case "git":
			message.channel.send('Ссылка на гит хаб проекта: https://github.com/12st/Custom-discort-bot');
			break;

		case "play":
			play(message, args[0]);
			break;
		}
	}catch(e) {
		console.log(e);
		message.reply('Что-то пошло не так!');
	}	

});

client.login(config.token);