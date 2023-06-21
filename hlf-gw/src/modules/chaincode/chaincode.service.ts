import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  ChaincodeTransactionResult,
  ChaincodeTransactionSubmissionModel,
} from 'src/dtos/models';
import { setupCCSelector } from '../../services/fabric/chaincodeHelper';
import CCService from '../../services/fabric/ccService';

@Injectable()
export class ChaincodeService {
  constructor() {}

  async submitTransaction(
    func: string,
    request: ChaincodeTransactionSubmissionModel,
    channelName: string,
    chaincodeName: string
  ): Promise<ChaincodeTransactionResult> {
    const result = await CCService.submitTransaction(
      func,
      request.payload,
      channelName,
      chaincodeName
    );

    return {
      func,
      channelName,
      chaincodeName,
      result,
    };
  }

  async queryTransaction(
    func: string,
    params: any,
    channelName: string,
    chaincodeName: string
  ): Promise<ChaincodeTransactionResult> {
    const payload = setupCCSelector(params);
    console.log('queryTransaction')
    console.log(payload)

    const result = await CCService.evaluateTransaction(
      func,
      payload,
      channelName,
      chaincodeName
    );

    return {
      func,
      channelName,
      chaincodeName,
      result,
    };
  }
}
