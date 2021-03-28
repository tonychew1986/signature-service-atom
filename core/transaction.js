
const bip39 = require('bip39');

require('dotenv').config()

const config = require('config');


const nodeURI = "http://localhost:1317"
const chainId = process.env.CHAIN_ID || config.get('chain-id');//"cosmoshub-3"

var mnemonicMainnet = process.env.MNEMONIC_MAINNET
var mnemonicTestnet = process.env.MNEMONIC_TESTNET

const cosmosjs = require("@cosmostation/cosmosjs");
const cosmos = cosmosjs.network(nodeURI, chainId);

cosmos.setBech32MainPrefix("cosmos");
const ecpairPriv = cosmos.getECPairPriv(mnemonicMainnet);

let generateSeed = async function(){
	const mnemonic = bip39.generateMnemonic();

	return mnemonic
}

let getAddress = async function(network, nonce) {
	cosmos.setPath("m/44'/118'/0'/0/"+nonce);
	let addr = cosmos.getAddress(mnemonicMainnet);

  return addr
}

let getAddressFull = async function(network, nonce) {

	let addressArray = [];

	for(var i=0; i<parseInt(nonce); i++){
		cosmos.setPath("m/44'/118'/0'/0/"+i);
		let addr = cosmos.getAddress(mnemonicMainnet);

		addressArray.push(addr);
	}

  return addressArray
}

let txSend = async function(network, senderAdd, receiverAdd, amount, accountNum, nonce) {
	let stdSignMsg = await cosmos.NewStdMsg({
		type: "cosmos-sdk/MsgSend",
		from_address: senderAdd,
		to_address: receiverAdd,
		amountDenom: "uatom",
		amount: uatomConversion(amount),		// 6 decimal places
		feeDenom: "uatom",
		fee: 100,
		gas: 200000,
		memo: "Transfer from RockX",
		account_number: accountNum,
		sequence: nonce
	});

  return stdSignMsg;
}

let txDelegate = async function(network, senderAdd, receiverAdd, amount, accountNum, nonce) {
	let stdSignMsg = await cosmos.NewStdMsg({
		type: "cosmos-sdk/MsgDelegate",
		delegator_address: senderAdd,
		validator_address: receiverAdd,
		amountDenom: "uatom",
		amount: uatomConversion(amount),		// 6 decimal places
		feeDenom: "uatom",
		fee: 100,
		gas: 200000,
  	memo: "Delegation from RockX",
		account_number: accountNum,
		sequence: nonce
	});

  return stdSignMsg;
}

let txUndelegate = async function(network, senderAdd, receiverAdd, amount, accountNum, nonce) {
	let stdSignMsg = await cosmos.NewStdMsg({
		type: "cosmos-sdk/MsgUndelegate",
		delegator_address: senderAdd,
		validator_address: receiverAdd,
		amountDenom: "uatom",
		amount: uatomConversion(amount),		// 6 decimal places
		feeDenom: "uatom",
		fee: 100,
		gas: 200000,
  	memo: "Undelegation from RockX",
		account_number: accountNum,
		sequence: nonce
	});

  return stdSignMsg;
}

let txWithdrawReward = async function(network, senderAdd, receiverAdd, accountNum, nonce) {
	let stdSignMsg = await cosmos.NewStdMsg({
		type: "cosmos-sdk/MsgWithdrawDelegationReward",
		delegator_address: senderAdd,
		validator_address: receiverAdd,
		amountDenom: "uatom",
		feeDenom: "uatom",
		fee: 100,
		gas: 200000,
  	memo: "Give me my rewards!!!",
		account_number: accountNum,
		sequence: nonce
	});

  return stdSignMsg;
}

let txSigning = async function(stdSignMsg) {
  const signedTx = cosmos.sign(stdSignMsg, ecpairPriv);

  return signedTx;
}

function uatomConversion(amountInAtom) {
	let n = amountInAtom * 1000000;

	return n;
}

exports.generateSeed = generateSeed;
exports.getAddress = getAddress;
exports.getAddressFull = getAddressFull;
exports.txSend = txSend;
exports.txDelegate = txDelegate;
exports.txUndelegate = txUndelegate;
exports.txWithdrawReward = txWithdrawReward;
exports.txSigning = txSigning;
