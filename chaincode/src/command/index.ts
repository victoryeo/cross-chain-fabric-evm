import { ChaincodeStub } from 'fabric-shim';
import { UserIdentity, BaseCommand } from '../common';

/**
 * It will find command handler to process the command
 *
 * @param {ChaincodeStub} chaincodeStub
 * @param {*} command
 * @param {UserIdentity} userIdentity
 * @returns
 */
 export const handleCommand = async (
  chaincodeStub: ChaincodeStub,
  command: BaseCommand,
  userIdentity: UserIdentity
) => {
  return 0;
}