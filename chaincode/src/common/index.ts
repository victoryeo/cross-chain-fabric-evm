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

export const MockClientIdentity = {
  assertAttributeValue(attrName: string, attrValue: string): boolean {
    return true;
  },
  getAttributeValue(attrName: string): string | null {
    return 'att';
  },
  getID(): string {
    return 'dummymspId';
  },
  getIDBytes(): Uint8Array {
    return Buffer.from('dummymspId');
  },
  getMSPID(): string {
    return 'dummymspId';
  },
  getX509Certificate(): any {
    return 'dummy';
  },
};