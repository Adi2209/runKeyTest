const { Command } = require('commander');
const { Gate } = require('../commons/Gate');
const approvalGateCommand = new Command('sanityGate');
const PipelinesAdapter = require('../commons/PipelinesAdapter.js');
approvalGateCommand
  .option('-a, --approved', 'is gate approved?')
  .option('--comment [string]', 'approval comment')
  .requiredOption('--stepName [string]', 'Approval gate step name')
  .requiredOption('--runId [integer]', 'Approval gate runId')
  .action(async (values) => {
    const adapter = new PipelinesAdapter('pipelinesTesting', values.apiUrl, values.token);
    console.log(values.runId, values.stepName);
    const gate = new Gate(values.runId, values.stepName, values.comment || 'no comment', adapter);
    try {
      if (values.approved === true) {
        await gate.approveStep();
        console.info('Approved the sanity gate step')
      } else {
        await gate.rejectStep()
        console.info('Rejected the sanity gate step')
      }
    } catch (error) {
      console.error('Unable to perform action with below error', error);
      process.exit(1);
    }
  });

module.exports = approvalGateCommand;
