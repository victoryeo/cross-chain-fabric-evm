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

}