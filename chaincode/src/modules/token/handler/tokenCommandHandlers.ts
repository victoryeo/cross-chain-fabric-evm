import { ChaincodeStub } from 'fabric-shim';
import ___ from 'underscore';

import { BaseCommandHandler, BaseCommand, validateCommand } from '../../../common';
import { TokenCommandPayload } from '../index';

const handlers = (): any => ({
  ImportToken: async (
    payload: TokenCommandPayload,
    chaincodeStub: ChaincodeStub,
  ) => {
    // Manually check the required fields
    const errMsg: string = await handlers()['ValidateRequiredFields'](payload);
    if (errMsg) {
      throw "missing field";
    }
  }
});


export class TokenCommandHandler implements BaseCommandHandler {
  isMatch(command: BaseCommand): boolean {
    return !!this.findHandler(command);
  }

  validateCommand(command: BaseCommand): boolean {
    return true;
  }
  
  async handleCommand(
    command: BaseCommand,
    chaincodeStub: ChaincodeStub
  ): Promise<any> {
    const handler = this.findHandler(command);
    return handler(command.payload, chaincodeStub);
  }

  findHandler(command: BaseCommand): any {
    return handlers()[command.name];
  }
}
