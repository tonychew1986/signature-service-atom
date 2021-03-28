var express = require('express')
var router = express.Router()

const axios = require('axios');

var txATOM = require('../core/transaction.js');

const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)


router.get('/test', (req, res) => {
  return res.send('test');
});

router.get('/generate/seed', asyncHandler(async (req, res, next) => {
  let seed = await txATOM.generateSeed();

  return res.send(seed);
}));

// , auth.isAuthorised
router.post('/wallet', asyncHandler(async (req, res, next) => {
  var network = req.body.network;
  var nonce = req.body.nonce
  let data = await txATOM.getAddress(network, nonce)

  console.log("data", data)

  return res.send(data);
}));

router.post('/wallet/all', asyncHandler(async (req, res, next) => {
  var network = req.body.network
  var nonce = req.body.nonce
  let data = await txATOM.getAddressFull(network, nonce)

  console.log("data", data)

  return res.send(data);
}));

router.post('/send', asyncHandler(async (req, res, next) => {
  var network = req.body.network;
  var amount = req.body.amount // 10000
  var senderAdd = req.body.senderAdd
  var receiverAdd = req.body.receiverAdd
  var accountNum = req.body.accountNum
  var nonce = req.body.nonce

  let tx = await txATOM.txSend(network, senderAdd, receiverAdd, amount, accountNum, nonce);
  let txSigned = await txATOM.txSigning(tx);

  console.log("tx", tx)
  console.log("txSigned", txSigned)

  return res.send(txSigned);
}));


router.post('/delegate', asyncHandler(async (req, res, next) => {
  var network = req.body.network;
  var amount = req.body.amount // 10000
  var senderAdd = req.body.senderAdd
  var receiverAdd = req.body.receiverAdd
  var accountNum = req.body.accountNum
  var nonce = req.body.nonce

  let tx = await txATOM.txDelegate(network, senderAdd, receiverAdd, amount, accountNum, nonce);
  let txSigned = await txATOM.txSigning(tx);

  console.log("tx", tx)
  console.log("txSigned", txSigned)

  return res.send(txSigned);
}));

router.post('/undelegate', asyncHandler(async (req, res, next) => {
  var network = req.body.network;
  var amount = req.body.amount // 10000
  var senderAdd = req.body.senderAdd
  var receiverAdd = req.body.receiverAdd
  var accountNum = req.body.accountNum
  var nonce = req.body.nonce

  let tx = await txATOM.txUndelegate(network, senderAdd, receiverAdd, amount, accountNum, nonce);
  let txSigned = await txATOM.txSigning(tx);

  console.log("tx", tx)
  console.log("txSigned", txSigned)

  return res.send(txSigned);
}));

router.post('/withdraw/reward', asyncHandler(async (req, res, next) => {
  var network = req.body.network;
  var senderAdd = req.body.senderAdd
  var receiverAdd = req.body.receiverAdd
  var accountNum = req.body.accountNum
  var nonce = req.body.nonce

  let tx = await txATOM.txWithdrawReward(network, senderAdd, receiverAdd, accountNum, nonce);
  let txSigned = await txATOM.txSigning(tx);

  console.log("tx", tx)
  console.log("txSigned", txSigned)

  return res.send(txSigned);
}));





module.exports = router
