const apiCommand = require("./api");
const approvalGateCommand = require("./gate");

module.exports.commandsList = [
  approvalGateCommand,
  apiCommand
]