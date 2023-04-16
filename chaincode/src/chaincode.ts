import { ClientIdentity, ChaincodeStub, Shim } from 'fabric-shim';

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
      // Client identity information when it is registered to CA
      const clientIdentity = this.createClientIdentity(chaincodeStub);
    } catch (error) {
      console.log(`Error: ${error}`);
      return Shim.error(error);
    }
  }

  private createClientIdentity(chaincodeStub: ChaincodeStub): ClientIdentity {
    return new ClientIdentity(chaincodeStub);
  }
}