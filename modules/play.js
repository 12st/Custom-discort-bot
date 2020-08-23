import ytdl from 'ytdl-core';

async function play (message, args) {  
    if (message.member.voice.channel) {
        let connection;
        try{ 
             connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(ytdl(args, 
            { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25}));
                
            dispatcher.setVolume(0.5);
            dispatcher.on('start', () => {
                console.log(`Start playing:${args} in ${message.guild.name}`);
            });
            dispatcher.on('finish', () => {
                console.log('Finished playing!');
                connection.disconnect();
                dispatcher.destroy();
                
            });
            dispatcher.on('error', console.error);
            }catch(e) {
                console.log(e);
                message.reply('Что-то пошло не так!');
                connection.disconnect();
            } 
    } else {
    message.reply('You need to join a voice channel first!');
    }
}
 export default play;