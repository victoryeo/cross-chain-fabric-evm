import { ChaincodeStub } from 'fabric-shim';
import { UserIdentity, BaseCommand, BaseCommandHandler } from '../common';
import { HealthCommandHandler } from '../modules/health';
import { TokenCommandHandler } from '../modules/token';

/**
 * Define all command handler here
 */
 const commandHandlers: BaseCommandHandler[] = [
  new HealthCommandHandler(),
  new TokenCommandHandler(),
];

/**
 * It will find command handler to process the command
 *
 * @param {ChaincodeStub} chaincodeStub
 * @param {*} command
 * @param {UserIdentity} userIdentity
 * @returns
 */
export const findHandleCommand = async (
  chaincodeStub: ChaincodeStub,
  command: BaseCommand,
  userIdentity: UserIdentity
) => {
  // Find handler by command
  const commandHandler = commandHandlers.find(handler => {
    return handler.isMatch(command);
  });
  // Handler is not found
  if (!commandHandler) {
    console.error("Handler is not found")
  }

  try {
    return await commandHandler.handleCommand(
      command,
      chaincodeStub,
      userIdentity
    );
  } catch (e) {
    console.log(`Error: ${e}`);
    throw e;
  }
}