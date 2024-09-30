require('dotenv').config();
const { REST, Routes, version } = require('discord.js');

const commands = [
  {
    name: 'hey',
    description: 'antwortet mit hey',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Slash Commands werden registriert...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('Slash Commands wurden Erfolgreich registriert!');
  } catch (error) {
    console.log(`Ein Fehler ist aufgetreten: ${error}`);
  }
})();
