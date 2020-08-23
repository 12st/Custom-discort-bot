import clear from './modules/clear.js';
import play from './modules/play.js';
import Discord from 'discord.js'; 
import fs from 'fs'; 
import config from'./config.json'; 




const client = new Discord.Client();

client.on("ready", function(){ 
	console.log(client.user.username + " запустился!");
	client.user.setActivity(`Use !help for view list of commands.`);
});

let botConfig = {
	checkComm: true
};

client.on("message", function(message) {
	if (message.author.bot) {return;}
	if (!message.content.startsWith(config.prefix)) {return;}

	const commandBody = message.content.slice(config.prefix.length);
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
			message.channel.send(
				"!help отображает список текущих команд \n" +
				"!ping пингует бота \n" +
				"!avatar получить ссылку на свой аватар \n" +
				"!clear {число} удалить последние соообщения \n" +
				"!userid получить свой id \n" +
				"!git ссылка на гит репозиторий \n" +
				"!play {url} подключается к вашему голосовому каналу и запускает видео в аудио формате \n" +
				"!setcheck включение/отключение проверки на правильность команды \n" 
				);
			break;

		case "avatar":
			message.reply(message.author.displayAvatarURL());
			break;

		case "userid":
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
		case "setcheck":
			if(botConfig.checkComm) {
				botConfig.checkComm = false;
				message.channel.send("Проверка отключена");
			} else {
				botConfig.checkComm = true;
				message.channel.send("Проверка включена");
			}
			break;
		default:
			if(botConfig.checkComm) {message.reply("Неверная команда");}
			break;
		}
	}catch(e) {
		console.log(e);
		message.reply('Что-то пошло не так!');
	}	

});

client.login(config.token);