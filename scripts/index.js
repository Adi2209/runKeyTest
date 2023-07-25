const { program } = require('commander');
const { commandsList } = require('./commands');

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

commandsList.forEach((command) => {
  command
    .requiredOption('--apiUrl [string]', 'Pipeline api url', API_URL)
    .requiredOption('--token [string]', 'Pipelines api token', API_TOKEN)
  program.addCommand(command);
});

program.parse(process.argv);

