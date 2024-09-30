require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'add',
    description: 'Fügt zwei Nummern hinzu.',
    options: [
      {
        name: 'erste-zahl',
        description: 'Die erste Nummer',
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: 'one',
            value: 1,
          },
          {
            name: 'two',
            value: 2,
          },
          {
            name: 'three',
            value: 3,
          }
        ],
        required: true,  // Korrekt: required
      },
      {
        name: 'zweite-zahl',
        description: 'Die zweite Zahl',
        type: ApplicationCommandOptionType.Number,
        required: true,  // Korrekt: required
      },
    ],
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
    console.log('Slash Commands wurden erfolgreich registriert!');
  } catch (error) {
    console.log(`Ein Fehler ist aufgetreten: ${error}`);
  }
})();
