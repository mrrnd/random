// var baseUrl = '<%= request.base_url %>';

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  // web3 = new Web3(new Web3.providers.HttpProvider("https://bchain.dsplus.pro"));
}

var wei = 1000000000000000000;

checkSync();

var contract_address = '0xc18d0ae6e73fdf3d05cd2ae260617f92378cfaef';

var randomContract = web3.eth.contract(abi);
var randomContractInstance = randomContract.at(contract_address);

var current_address = '0xfEdAC0b99F3e7956A90Dcb8697fb5FdA506725A5';

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

var countWinner = 0;
var winners = [];
var winnings = [];

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


    var cc = Cookies.get('user_address');
    if(cc != undefined) {
      current_address = cc;
    }
    $('#input_address').val(current_address);

    arrayContractAddress = ["0xe88d26c2BCd7a38ffd22aCEc1B98a9AF4C6611fD", "0xe88d26c2BCd7a38ffd22aCEc1B98a9AF4C6611fD", "0xe88d26c2BCd7a38ffd22aCEc1B98a9AF4C6611fD"]
    randomContract = web3.eth.contract(abi);

    arrayContractAddress.forEach(function(item, i, array) {
      console.log(i);
      contract_address = item;
      if(i == 0){
        $('#buy_address').val(contract_address);
      }
      randomContractInstance = randomContract.at(contract_address);
      self.getInfo(i);
      self.getTicketsCount(current_address,i);
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

    // randomContractInstance.jackPot.call(i, function(error, result) {
    //   console.log("i: " + i)
    //   if(!error) {
    //     $('#'+id1).html( web3.fromWei(result.toNumber()) ); //.html( web3.fromWei(result.toNumber()) );
    //     // console.log(result.toNumber());
    //   } else {
    //     $('#'+id1).html('error');
    //       console.error(error);
    //   }
    // });

    var current_block = 0;

    // web3.eth.blockNumber.get(function(error, result) {
    //   if(!error) {
    //     // $('#'+).html(result);
    //     current_block = result;
    //   } else {
    //     // $('#'+id1).html('error');
    //     console.error(error);
    //   }
    // });
    web3.eth.getBlockNumber(function(err, result) {
        current_block = result;
    });

    randomContractInstance.endBlockNumber.call(function(error, result) {
      if(!error) {
        var div = result - current_block;
        if(div < 0) { div = 0; }
        $('#current_block').text(current_block + ' / ' + result + ' ('+div+' blocks left)');
      } else {
        $('#current_block').text('error');
        console.error(error);
      }
    });

    web3.eth.getBalance(current_address, function(error, result){
        if(!error) {
          $('#'+target_id).html( web3.fromWei( result.toNumber() ) + " ETH");
          // console.log(result.toNumber());
        } else {
          $('#'+target_id).html('error');
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

    randomContractInstance.getRecentWinnersCount.call(function(error, result) {
        if(!error) {
            countWinner = result.toNumber();
            App.drawHistory();
            // console.log(result.toNumber());
        } else {
            console.error(error);
        }
    });

    randomContractInstance.getRecentWinners.call(function(error, result) {
        if(!error) {
            winners = result;
            App.drawHistory();
            // console.log(result.toNumber());
        } else {
            console.error(error);
        }
    });

    randomContractInstance.getRecentWinnings.call(function(error, result) {
        if(!error) {
            winnings = result;
            App.drawHistory();
            // console.log(result.toNumber());
        } else {
            console.error(error);
        }
    });


  },

  drawHistory: function(){
    if(countWinner == 0 || countWinner != winners.length || countWinner != winnings.length){
      $('#panel_history').hide();
      console.log("draw history returned");
      return
    }
    content = "";
    for(i = 0; i < countWinner; i++){
      innerContent = "";
      innerContent += "<td>"+winners[i]+"</td>";
      innerContent += "<td>"+winnings[i].toNumber()+"</td>";

      content += "<tr>"+innerContent+"</tr>";
    }
    $('#content_history').html(content);
    $('#panel_history').show();
  },

  getETHBalance: function(addr, target_id) {
    console.log("Getting Balance for "+ addr);
    web3.eth.getBalance(current_address, function(error, result){
      callback && callback(error, result);

        if(!error) {
          $('#account_balance').html( web3.fromWei( result.toNumber() ) + " ETH");
          // console.log(result.toNumber());
        } else {
          $('#account_balance').html('error');
            console.error(error);
        }
    });
  },

    getBalance: function (addr, target_id) {
        console.log("Getting Lottery Balance for " + addr);
        console.log(target);
        randomContractInstance.balanceOf.call(addr, function (error, result) {
            if (!error) {
                $('#' + target_id).html(web3.fromWei(result.toNumber()) + ' ETH'); //.html( web3.fromWei( result.toNumber() ) );
                console.log(result.toNumber());
            } else {
                $('#' + target_id).html('error');
                console.error(error);
            }
        });
    },

  getTicketsCount: function(addr, target_id) {
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
      return meta.getTickets.call(account, {from: account});
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

function joinUpdateAddress() {
    addr = $('#input_address').val();

    if(addr.charAt(0) !== "0" || addr.charAt(1) !== "x" || addr.length !== 42) {
        alert("Input correct Ethereum address");
        return false;
    }

    current_address = addr;
    App.getETHBalance(addr, 'account_balance');
    App.getBalance(addr, 'balance')
}

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


