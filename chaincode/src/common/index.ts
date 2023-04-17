import { ChaincodeStub } from 'fabric-shim';

export interface UserIdentity {
  id: string;
  mspId: string;
}

export interface BaseCommand {
  name: string;
  payload: any;
}

export interface BaseCommandHandler {
  isMatch(command: BaseCommand): boolean;

  handleCommand(
    command: BaseCommand,
    chaincodeStub: ChaincodeStub,
    userIdentity: UserIdentity
  ): Promise<any>;
}
