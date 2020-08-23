function clear(message) {
    
    console.log(`Вызвана функция clear на сервере ${message.guild.name} пользователем ${message.author.username}`);
    if(message.author.username !== '12s') {
        message.channel.send("Недостаточно прав для команды");
        return;
    }

    const arggs = message.content.split(' ').slice(1); // Все аргументы за именем команды с префиксом
    const amount = arggs.join(' '); // Количество сообщений, которые должны быть удалены
    
    if (!amount) {
        return message.channel.send('Вы не указали, сколько сообщений нужно удалить!');
    } // Проверка, задан ли параметр количества
    
    if (isNaN(amount)) {
        return message.channel.send('Это не число!');
    } // Проверка, является ли числом ввод пользователя 
    
    if (amount > 100) {
        return message.channel.send('Вы не можете удалить 100 сообщений за раз');
    } // Проверка, является ли ввод пользователя числом больше 100
   
    if (amount < 1) {
        return message.channel.send('Вы должны ввести число больше чем 1');
    } // Проверка, является ли ввод пользователя числом меньше 1
    
    async function deleteMessages() { // Объявление асинхронной функции

    await message.channel.messages.fetch({ limit: amount }).then(messages => {
        message.channel.bulkDelete(messages);
        message.channel.send(`Удалено ${amount} сообщений!`);
         });
    }

    deleteMessages(); // Вызов асинхронной функции
} 

export default clear;