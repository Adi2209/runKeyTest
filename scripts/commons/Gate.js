const PipelinesAdapter = require('./PipelinesAdapter');
const util = require('util');

class Gate {
  constructor (runId, stepName, comment, adapter) {
    this.runId = runId
    this.stepName = stepName
    this.comment = comment
    this.adapter = adapter;
  }

  async getApprovalGateStepId() {
    console.info(`StepName: ${this.stepName} RunId: ${this.runId}`)
    const getStepPromisified =  util.promisify(this.adapter.getSteps).bind(this.adapter);
    const steps = await getStepPromisified(`runIds=${this.runId}&names=${this.stepName}&limit=1`);
    if (!steps || steps.length !== 1) {
      throw new Error(`step name ${this.stepName} not found for runId ${runId}`);
    }
    return steps[0].id;
  }
  
  async approveStep() {
    const approvalGateStepId = await this.getApprovalGateStepId(this.runId, this.stepName);
    const sendApprovalResponsePromisfied =  util.promisify(this.adapter.sendApprovalResponse).bind(this.adapter);
    const response = await sendApprovalResponsePromisfied(approvalGateStepId, {
      response: "approved",
      comment: this.comment
    });
    console.info(response);
  }
  
  async rejectStep() {
    const approvalGateStepId = await this.getApprovalGateStepId(this.runId, this.stepName);
    const sendApprovalResponsePromisfied =  util.promisify(this.adapter.sendApprovalResponse).bind(this.adapter);
    const response = await sendApprovalResponsePromisfied(approvalGateStepId, {
      response: "rejected",
      comment: this.comment
    });
    console.info(response);
    return response;
  }
}

module.exports.Gate = Gate;