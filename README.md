Signature Service for Cosmos (ATOM)
=====================================

<URL>

How does this work?
----------------

Signature service is used in conjunction with Wallet service to enable secure signing and transaction related functionality for blockchain. Since different blockchain have nuance differences, this services are application specific.

This service should not be called directly (besides during testing) and should only be called through Wallet Aggregator in production. This is to  prevent errors from sending coins on main net. Safeguards are applied on Wallet Aggregator that always defaults any calls to testnet.

** Signature Service must be placed in environment where all ports are closed and only source of communication is with Wallet Service

Application Flow
-------

Client UI <-> Wallet Aggregator <-> Wallet Service <-> Signature Service

Blockchain Differences
-------

- delegate
- undelegate
- withdraw rewards

Available End points
-------
- GET /test
- GET /wallet?network=<network>&nonce=<nonce>
- POST /send [network, amount, senderAdd, receiverAdd, accountNum, nonce]
- POST /delegate [network, amount, senderAdd, receiverAdd, accountNum, nonce]
- POST /undelegate [network, amount, senderAdd, receiverAdd, accountNum, nonce]
- POST /withdraw/reward [network, senderAdd, receiverAdd, accountNum, nonce]

ENV parameters
-------
Available at ./instructions/env.md


## Instructions

To test application:

```bash
$ npm test
```

Install NPM modules on fresh deployment:

```bash
$ npm install
```

To run in development mode:

```bash
$ node index.js
```

To run in production mode:

```bash
$ pm2 start sign-svc-atom/index.js --name "sign-atom"
```
