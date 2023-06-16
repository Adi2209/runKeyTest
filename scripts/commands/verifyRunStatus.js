const { Command } = require('commander');

const command = new Command('verifyRunStatus');

command
  .requiredOption('--runId [integer]', 'runId')
  .requiredOption('--status [string]', 'status')
  .action(async (values) => {
   const {runId, status } = values;
   const utils = new Utils(); 
   await utils.verifyRunStatus(runId, status);
  });

module.exports = command;