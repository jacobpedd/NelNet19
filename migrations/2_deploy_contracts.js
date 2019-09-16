var Election = artifacts.require("./Election.sol");
var Users = artifacts.require("./Users.sol");

module.exports = function(deployer) {
  deployer.deploy(Election);
  deployer.deploy(Users);
};