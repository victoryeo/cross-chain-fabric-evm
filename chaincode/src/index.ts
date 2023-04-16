import { Shim } from 'fabric-shim';
import TokenChaincode from './chaincode';

// Main entry for chaincode
Shim.start(new TokenChaincode());
