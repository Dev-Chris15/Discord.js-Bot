require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`👍 ${c.user.username} ist online`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === 'hello') {
        message.reply('hello');
    }

    if (message.content === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle("Embed Title")
            .setDescription("Das ist die Beschreibung vom Embed")
            .setColor('Random')
            .addFields(
                { 
                    name: 'Field Title', 
                    value: 'Some random Value',
                    inline: true 
                }, 
                {
                    name: 'Another Field', 
                    value: 'This is the Value',
                    inline: true 
                }
            );

        message.channel.send({ embeds: [embed] });
    }
});

client.on('interactionCreate', async (interaction) => {
    // Sicherstellen, dass es sich um einen Button-Click handelt
    if (!interaction.isButton()) return;

    // Antwort innerhalb des Zeitlimits verzögern
    await interaction.deferReply({ ephemeral: true });

    // Die Rolle anhand der customId der Interaktion abrufen
    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
        await interaction.editReply({
            content: 'Rolle wurde nicht gefunden. Bitte wende dich an den Server-Administrator.',
        });
        return;
    }

    // Überprüfen, ob der Benutzer die Rolle bereits hat
    const hasRole = interaction.member.roles.cache.has(role.id);

    try {
        if (hasRole) {
            // Rolle entfernen, wenn der Benutzer sie bereits hat
            await interaction.member.roles.remove(role);
            await interaction.editReply(`Die Rolle **${role.name}** wurde entfernt!`);
        } else {
            // Rolle hinzufügen, wenn der Benutzer sie nicht hat
            await interaction.member.roles.add(role);
            await interaction.editReply(`Die Rolle **${role.name}** wurde hinzugefügt!`);
        }
    } catch (error) {
        console.error('Fehler beim Bearbeiten der Rolle:', error);
        await interaction.editReply('Es gab einen Fehler beim Ändern der Rolle. Bitte versuche es später erneut.');
    }
});

client.login(process.env.TOKEN);
