require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id: '1291313451548938240',
        label: 'Red'
    },
    {
        id: '1291313499787493396',
        label: 'Green'
    },
    {
        id: '1291313543551123486',
        label: 'Blue'
    }
]

client.on('ready', async(c) => {
    console.log(`👍 ${c.user.username} ist online`);
    try {
        const channel = await client.channels.cache.get('1259536750720581642');
        if(!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })
        await channel.send({
            content: "Claim or remove a role",
            components: [row]
        });
        process.exit();
    } catch (error) {
        console.log(error);
    }
});



client.login(process.env.TOKEN);