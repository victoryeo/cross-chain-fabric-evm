# cross-chain-fabric-evm

This is an example of migrating bond tokens from hyperledger fabric to evm compatible blockchain

### brief introduction
chaincode folder contains the HLF chaincode.
evm folder contains the solidity smart contract.
app is the cross chain app that talks to both HLF and evm chain.
hlf-gw folder is the app that talks to HLF chaincode and provides a Rest API to other app.