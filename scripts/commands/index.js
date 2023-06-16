const apiCommand = require("./api");
const approvalGateCommand = require("./gate");
const verifyRunStatusCommand = require('./verifyRunStatus');
module.exports.commandsList = [
  verifyRunStatusCommand,
  approvalGateCommand,
  apiCommand
]