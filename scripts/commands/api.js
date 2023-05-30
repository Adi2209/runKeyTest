const { Command } = require('commander');

const apiCommand = new Command('api');

apiCommand
  .requiredOption('--method [string]', 'request method')
  .requiredOption('--url [string]', 'relative url')
  .option('--body [json]', 'Request body')
  .action(async (values) => {
    if (values.body) {
      const body = JSON.parse(values.body);
      console.log(body);
    }
  });

module.exports = apiCommand;