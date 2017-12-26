// var baseUrl = '<%= request.base_url %>';


if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  //web3 = new Web3(new Web3.providers.HttpProvider("https://bchain.dsplus.pro"));
}
var wei = 1000000000000000000;

checkSync();
//window.setInterval(function(){ checkSync(); }, 10000);


// var abi = [{"constant":true,"inputs":[],"name":"remaining_for_sale","outputs":[{"name":"remaining_coins","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nextState","type":"uint8"}],"name":"setTokenState","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TOKEN_ICO1_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TOKEN_PRESALE_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"current_state","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contract_address","type":"address"}],"name":"setAllowedContract","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_token_state","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TOKEN_ICO2_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allowed_contract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"TOKEN_ICO3_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fpct_packet_size","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_buyer","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner_MIN_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"soldAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newPrice","type":"uint128"}],"name":"setOwnerPrice","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Sent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"eth","type":"uint256"},{"indexed":false,"name":"fbt","type":"uint256"}],"name":"Buy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"eth","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newState","type":"uint8"}],"name":"StateSwitch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

// var randomContractInstance = randomContract.at(addr_TESTNET);

// const artifacts = require('../build/contracts/Lottery.json');
// const contract = require('truffle-contract');
// var randomContract = contract(artifacts); //

// var contract_address = '0xd9AC87A357934993beabA91DE165f0D2B4c201f4';

// var randomContract = web3.eth.contract(abi);
// var randomContractInstance = randomContract.at(contract_address);

// var current_address = '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';

var contract_address = '0xE5987fB6bAD2F0Dc41A7Ee0BC8c9D98802C467fD';

var randomContract = web3.eth.contract(abi);
var randomContractInstance = randomContract.at(contract_address);

var current_address = '0x008Ea31FfB285206099e5D5d546147a64aEC99C6';


function checkSync() {
  // $("#sync_status").text("checking...");
  web3.eth.getSyncing( function (error, result) { 
    console.log("SYNCING:");
    console.log(result);
    // if(result == false) {
    //   $("#sync_status").text("synced");
    // } else {
    //   $("#sync_status").text('Node syncing: '+result.currentBlock+'/'+result.highestBlock+' - '+(result.highestBlock-result.currentBlock)+' left' );
    // }
  });  
}


// var randomContract = contract(randomContract_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the randomContract abstraction for Use.
    //randomContract.setProvider(web3.currentProvider);

    // // Get the initial account balance so it can be displayed.
    // web3.eth.getAccounts(function(err, accs) {
    //   if (err != null) {
    //     alert("There was an error fetching your accounts.");
    //     return;
    //   }

    //   if (accs.length == 0) {
    //     alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
    //     return;
    //   }

    //   accounts = accs;
    //   account = accounts[0];

      
    // });
    console.log("START");
    self.calculate_summ();
    // self.getETHBalance(current_address, 'eth_balance');
    // self.getBalance(current_address);
    // self.getInfo();

    // $('#current_address').val(current_address);
    // $('#buy_address').html(contract_address);

    // getContractTX();

    arrayContractAddress = ["0xe5987fb6bad2f0dc41a7ee0bc8c9d98802c467fd", "0xe5987fb6bad2f0dc41a7ee0bc8c9d98802c467fd", "0xe5987fb6bad2f0dc41a7ee0bc8c9d98802c467fd"]
    randomContract = web3.eth.contract(abi);

    arrayContractAddress.forEach(function(item, i, array) {
      console.log(i);
      contract_address = item;
      if(i == 0){
        $('#buy_address').val(contract_address);
      }
      randomContractInstance = randomContract.at(contract_address);
      self.getInfo(i);
      self.getBalance(current_address,i);
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  getInfo: function(target_id) {
    randomContractInstance.ticketsNum.call(function(error, result) {
        if(!error) {
          $('#tickets_count_'+target_id).html( result.toNumber() ); //.html( web3.fromWei(result.toNumber()) );
          // console.log(result.toNumber());
        } else {
          $('#tickets_count_'+target_id).html('error');
            console.error(error);
        }
    });
    randomContractInstance.jackPot.call(1, function(error, result) {
        if(!error) {
          $('#jackpot_val_'+target_id).html( web3.fromWei(result.toNumber()) ); //.html( web3.fromWei(result.toNumber()) );
          // console.log(result.toNumber());
        } else {
          $('#jackpot_val_'+target_id).html('error');
            console.error(error);
        }
    });
    randomContractInstance.prizeFund.call( function(error, result) {
        if(!error) {
          $('#prize_fund_'+target_id).html( web3.fromWei(result.toNumber()) ); //.html( web3.fromWei(result.toNumber()) );
          // console.log(result.toNumber());
        } else {
          $('#prize_fund_'+target_id).html('error');
            console.error(error);
        }
    });
  },

  getETHBalance: function(addr, target_id) {
    web3.eth.getBalance(current_address, function(error, result){
        if(!error) {
          $('#'+target_id).html( web3.fromWei( result.toNumber() ) + " ETH");
          // console.log(result.toNumber());
        } else {
          $('#'+target_id).html('error');
            console.error(error);
        }
    });
  },

  getBalance: function(addr, target_id) {
    console.log("Getting Balance for "+ addr);
    target = 'tickets_purchased_'+target_id;
    console.log(target);
    randomContractInstance.getTicketsCount.call(addr, function(error, result) {
        if(!error) {
          $('#'+target).html( result.toNumber() ); //.html( web3.fromWei( result.toNumber() ) );
          console.log(result.toNumber());
        } else {
          $('#'+target).html('error');
            console.error(error);
        }
    });
  },

  getTickets: function() {
    var self = this;

    var meta;
    randomContract.then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
      var balance_element = document.getElementById("balance");
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  buyTickets: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    randomContract.buyTickets(receiver, amount, {from: account}).then(function() {
      self.setStatus("Transaction complete!");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  },

  calculate_summ: function() {
    var amount = $("#amount").val();
    var eth = amount * 0.01;
    $("#amount_eth").val(eth);
    $("#amount_txt").text(amount);
    $("#amount_eth_txt").text(eth);
  }
};


window.addEventListener('load', function() {
  App.start();
});


function getContractTX() {
  var filter=web3.eth.filter({fromBlock:0,toBlock:'latest',topics:[contract_address]});
  filter.get(function(error,result){
    console.log("all events")
    if(error) {
      console.log('ERROR: '+error);
    }
    console.log("\n"+JSON.stringify(result)+"\n");
  });
}


