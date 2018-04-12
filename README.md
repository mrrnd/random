# Random

Its uniqueness is very simple — it is the fairest lottery in the World. It is possible because the process is being carried out using Ethereum Blockchain. It uses Smart Contracts, it fully excludes the human factor. RANDOM platform uses RND Tokens instead of lottery tickets, the cost of one RND Token is 0,01 ETH.
Join daily, weekly or monthly lotteries.


# Smart contract source code

- [Random lottery smart contract](contract/)


# Smart-contract description

Random smart-contract contains:

- Public variables and constants:
	- `uint public ticketsNum` - tickets number for the current draw;
	- `mapping(uint => uint) internal tickets` - tickets for the current draw;
	- `mapping(uint => bool) internal payed_back` - ticket payment refunding identifier;
	- `address[] public addr` - addresses of all the draw participants;
	- `uint32 public random_num` - draw serial number;
	- `uint public liveBlocksNumber` - amount of blocks untill the lottery ending;
	- `uint public startBlockNumber` - initial block of the current lottery;
	- `uint public endBlockNumber` - final block of the current lottery;
	- `uint public constant onePotWei = 10000000000000000` - 1 ticket cost is 0.01 ETH;
	- `address public inv_contract` - investing contract;
	- `address public rtm_contract` - team contract;
	- `address public mrk_contract` - marketing contract;
	- `address manager` - lottery manager address;
	- `uint public winners_count` - amount of winners in the current draw;
	- `uint last_winner` - amount of winners already received rewards;
	- `uint public others_prize` - prize fund less jack pots;
	- `uint public fee_balance` - current balance available for commiting payment to investing, team and marketing contracts.


- Events. This generates a public events on the blockchain that will notify clients:
	- `event Buy(address indexed sender, uint eth)`
	tickets purchase
	- `event Withdraw(address indexed sender, address to, uint eth)`
	reward accruing
	- `event Transfer(address indexed from, address indexed to, uint value)`
	sending ticket to another address
	- `event TransferError(address indexed to, uint value); // event (error)
	sending ETH from the contract was failed


- Modifiers:
	- `modifier onlyManager()`
	methods with following modifier can only be called by the manager

- Functions
	- `function Random(uint _liveBlocksNumber) public`
	constructor
	- `function() public payable`
	function for straight tickets purchase (sending ETH to the contract address)
	- `function transfer(address _to, uint _ticketNum) public`
	function for ticket sending from owner's address to designated address
	- `function manager_withdraw() onlyManager public`
	manager's opportunity to write off ETH from the contract, in a case of unforseen contract blocking (possible in only case of more than 24 hours from the moment of lottery ending had passed and a new one has not started)
	- `function EndLottery() public payable returns (bool success)`
	lottery ending
	- `function startNewDraw(uint _msg_value) internal`
	new draw start
	- `function payfee() public`
	sending rewards to the investing, team and marketing contracts 
	- `function sendEth(address _to, uint _val) internal returns(bool)`
	function for sending ETH with balance check (does not interrupt the program if balance is not sufficient)
	- `function getWinningNumber(uint _blockshift) internal constant returns (uint)`
	get winning ticket number basing on block hasg (block number is being calculated basing on specified displacement)
	- `function jackPotA() public view returns (uint)`
	current amount of jack pot 1
	- `function jackPotB() public view returns (uint)`
	current amount of jack pot 2
	- `function jackPotC() public view returns (uint)`
	current amount of jack pot 3
	- `function prizeFund() public view returns (uint)`
	current amount of prize fund
	- `function percent(uint _val, uint8 _percent) public pure returns (uint)`
	function for calculating definite percent of a number
	- `function getTicketOwner(uint _num) public view returns (address)`
	returns owner address using ticket number
	- `function getTicketsCount(address _addr) public view returns (uint)` 
	returns amount of tickets for the current draw in the possession of specified address
	- `function getTicketsAtAdress(address _address) public view returns(uint[])`
	returns tickets numbers for the current draw in the possession of specified address
	- `function getLastWinner() public view returns(uint)`
	returns amount of paid rewards for the current draw
	- `function setInvContract(address _addr) onlyManager public`
	investing contract address change
	- `function setRtmContract(address _addr) onlyManager public`
	team contract address change
	- `function setMrkContract(address _addr) onlyManager public`
	marketing contract address change
	- `function checkAddress(address _addr) public returns (uint addr_num)`
	returns number of participant (in the list of participants) by belonging address and adding to the list, if not found
	- `function readAddress(address _addr) public view returns (uint addr_num)`
	returns participants number (in the list of participants) be belonging address (read only)
	- `function getAddress(uint _index) public view returns (address)`
	returns address by the number in the list of participants
	- `function deposit() public payable`
	method for direct contract replenishment with ETH
