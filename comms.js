const config = require('./config.json');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const prefix = config.prefix;
const versions = config.versions;


// Команды //

    function test(robot, mess, args) {
        mess.channel.send("Тест!");
    }

    function hello(robot, mess, args) {
        mess.reply("Привет!");
    }

    function help(robot, mess, args) {
        let str;
       commsList.forEach(element => {
           str +=`!${element.name} ${element.about} \n`;
       });
       console.log(commsList);
       mess.channel.send(str);
    }

    function avatar(robot, mess, args) {
        mess.reply(mess.author.displayAvatarURL());
    }

    function clear(robot, mess, args) {
    
        console.log(`Вызвана функция clear на сервере ${mess.guild.name} пользователем ${mess.author.username}`);
        if(mess.author.username !== '12s') {
            mess.channel.send("Недостаточно прав для команды");
            return;
        }

        const arggs = mess.content.split(' ').slice(1); // Все аргументы за именем команды с префиксом
        const amount = arggs.join(' '); // Количество сообщений, которые должны быть удалены
        
        if (!amount) {
            return mess.channel.send('Вы не указали, сколько сообщений нужно удалить!');
        } // Проверка, задан ли параметр количества
        
        if (isNaN(amount)) {
            return mess.channel.send('Это не число!');
        } // Проверка, является ли числом ввод пользователя 
        
        if (amount > 100) {
            return mess.channel.send('Вы не можете удалить 100 сообщений за раз');
        } // Проверка, является ли ввод пользователя числом больше 100
       
        if (amount < 1) {
            return mess.channel.send('Вы должны ввести число больше чем 1');
        } // Проверка, является ли ввод пользователя числом меньше 1
        
        async function deleteMessages() { // Объявление асинхронной функции

        await mess.channel.messages.fetch({ limit: amount }).then(messages => {
            mess.channel.bulkDelete(messages);
            mess.channel.send(`Удалено ${amount} сообщений!`);
             });
        }

        deleteMessages(); // Вызов асинхронной функции
    } 

    function userId(robot,mess,args) {
        mess.channel.send(`Your username: ${mess.author.username}\nYour ID: ${mess.author.id}`);
    }

    function react(robot,mess,args) {
        mess.react('🍎');
	    mess.react('🍊');
	    mess.react('🍇');
    }

    async function  play(robot, mess,args) {
        if (mess.member.voice.channel) {
            let connection;
            try{ 
                 connection = await mess.member.voice.channel.join();
                const dispatcher = connection.play(ytdl(args[1], 
                { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25}));
                    
                dispatcher.setVolume(0.5);
                dispatcher.on('start', () => {
                    console.log(`Start playing:${args[1]} in ${mess.guild.name}`);
                });
                dispatcher.on('finish', () => {
                    console.log('Finished playing!');
                    connection.disconnect();
                    dispatcher.destroy();
                    
                });
                dispatcher.on('error', console.error);
                }catch(e) {
                    console.log(e);
                    mess.reply('Что-то пошло не так!');
                    connection.disconnect();
                } 
        } else {
        mess.reply('You need to join a voice channel first!');
        }
    }

    function git(robot,mess,args) {
        mess.channel.send('Ссылка на гит хаб проекта: https://github.com/12st/Custom-discort-bot');
    }



let commsList = [
	{name: "test", out: test, about: "Тестовая команда"},
    {name: "hello", out: hello, about: "Команда для приветствия!"},
    {name: "help", out: help, about: "Помощь по боту"},
    {name: "avatar", out: avatar, about: "Выводит аватар пользователя"},
    {name: "clear", out: clear, about: "Отчистка"},
    {name: "id", out: userId, about: "Получить id"},
    {name: "react", out: react, about: "Реакция"},
    {name: "play", out:play, about: "Музыка"},
    {name: 'git', out:git, about:"Гит"}
];

module.exports.comms = commsList;
