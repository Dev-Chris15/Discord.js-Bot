require('dotenv').config();
const { Client, IntentsBitField, Message } = require('discord.js');


const client = new Client({
intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
],
})


client.on('ready', (c) => {
    console.log(`👍 ${c.user.username} ist online`)
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content === 'hello') {
    message.reply('hello')
}
});


client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('erste-zahl').value;
        const num2 = interaction.options.get('zweite-zahl').value;

        interaction.reply(`Die Summe wenn man diese beiden Zahlen addiert ist ${num1 + num2}! Was du mit dieser Information anfangen willst ist dir überlassen!`);
    }
})

client.login(process.env.TOKEN);