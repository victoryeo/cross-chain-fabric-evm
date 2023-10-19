import { ChaincodeStub } from 'fabric-shim';
import ___ from 'underscore';

import { BaseCommandHandler, BaseCommand, validateCommand } from '../../../common';
import { TokenCommandPayload, QueryGenericPayload } from '../index';
import { TokenResourceModel } from '../type/model';

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
    console.log("inside ImportToken")

    const model: TokenResourceModel = {
      ...payload,
    };
    return model;
  },

  QueryToken: async (
    payload: QueryGenericPayload,
    chaincodeStub: ChaincodeStub
  ) => {
    //let eventData = new Uint8Array([1, 2, 3, 4]);
    //await chaincodeStub.setEvent('testEvent', eventData);
  },
  ValidateRequiredFields: async (payload: TokenCommandPayload) => {
    let missedFieldMsg: string = '';
    const payloadProp: string[] = Object.keys(payload);
    const missedFields: string[] = [];
    const requiredFields: string[] = [
      'identifier',
    ];
    for (let i = 0; i < payloadProp.length; i += 1) {
      if (
        requiredFields.includes(payloadProp[i]) &&
        ___.isEmpty(payload[payloadProp[i]])
      ) {
        missedFields.push(payloadProp[i]);
      }
    }
    if (missedFields.length) {
      missedFieldMsg = `${
        "errors"
      }: ${missedFields.toString()}`;
    }

    return missedFieldMsg;
  },
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
