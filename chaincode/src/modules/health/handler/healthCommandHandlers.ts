import { ChaincodeStub } from 'fabric-shim';
import ___ from 'underscore';

import { BaseCommandHandler, BaseCommand } from '../../../common';

const handlers = (): any => ({
  health: async () => {
    return 'healthy';
  },
});

export class HealthCommandHandler implements BaseCommandHandler {
  isMatch(command: BaseCommand): boolean {
    return !!this.findHandler(command);
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
