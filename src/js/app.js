App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Users.json", function(users) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Users = TruffleContract(users);
      // Connect provider to interact with contract
      App.contracts.Users.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var usersInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Users.deployed().then(function(instance) {
      usersInstance = instance;
      return usersInstance.userMap("");
    }).then(function(user) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();
      var candidateTemplate = "<tr><th>" + user[0] + "</th><td>" + user[1] + "</td><td>" + user[2] + "</td></tr>"
      candidatesResults.append(candidateTemplate);

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});