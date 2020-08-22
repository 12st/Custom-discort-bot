const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const robot = new Discord.Client(); // Объявляем, что robot - бот
const comms = require("./comms.js"); // Подключаем файл с командами для бота
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js  
let config = require('./config.json'); // Подключаем файл с параметрами и информацией
let token = config.token; // «Вытаскиваем» из него токен
let prefix = config.prefix; // «Вытаскиваем» из него префикс
const ytdl = require('ytdl-core');

robot.on("ready", function(){ /* Бот при запуске должен отправить в терминал сообщение «[Имя бота] запустился!» */
	console.log(robot.user.username + " запустился!");
});


robot.on('message', (msg) => { // Реагирование на сообщения
	if(msg.author.username != robot.user.username && msg.author.discriminator != robot.user.discriminator){
    	let comm = msg.content.trim()+" ";
	    let ok = false;
	    let commName = comm.slice(0, comm.indexOf(" "));
	    let messArr = comm.split(" ");
	    for(let commCount in comms.comms){
	    	let comm2 = prefix + comms.comms[commCount].name;
	    	if(comm2 == commName){
	    		comms.comms[commCount].out(robot, msg, messArr);
	    	}
	    }
    } 
});

robot.login(token); // Авторизация бота