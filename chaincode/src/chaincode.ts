import { ClientIdentity, ChaincodeStub, Shim } from 'fabric-shim';
import { UserIdentity, MockClientIdentity } from './common';
import { findHandleCommand } from './command';

export default class TokenChaincode {
  /**
   * Init function, it will be invoked when instantiate chaincode
   *
   * @returns
   * @memberof TokenChaincode
   */
  public async Init() {
    return Shim.success();
  }

  /**
   * Invoke function, it will be invoked by Chaincode client
   *
   * @param {ChaincodeStub} chaincodeStub
   * @returns
   * @memberof TokenChaincode
   */
  public async Invoke(chaincodeStub: ChaincodeStub) {
    try {
      console.log(`Invoke ${chaincodeStub}`)
      // Client identity information when it is registered to CA
      const clientIdentity = this.createClientIdentity(chaincodeStub);
      console.log(`Invoke ${clientIdentity}`)

      const identity: UserIdentity = {
        id: clientIdentity.getID(),
        mspId: clientIdentity.getMSPID(),
      };

      if (!identity.mspId) {
        console.error("Bad Client identity");
      }
      console.info(JSON.stringify(identity));
      const ret = chaincodeStub.getFunctionAndParameters();
      console.info(`command name: ${ret.fcn}`);

      const command = {
        name: ret.fcn, // Function name, will be mapped to command name
        payload: JSON.parse(ret.params[0] ?? null), 
        // Only accept first param as JSON object
      };

      // Handle command
      console.log(`Invoke ${command}`)
      const result = await findHandleCommand(chaincodeStub, command, identity);

      // Return result
      return Shim.success(Buffer.from(JSON.stringify(result)));
    } catch (error) {
      console.log(`Error: ${error}`);
      return Shim.error(error);
    }
  }

  private createClientIdentity(chaincodeStub: ChaincodeStub): ClientIdentity {
    if (process.env.NODE_ENV === 'Test') {
      return MockClientIdentity;
    }
    return new ClientIdentity(chaincodeStub);
  }
}