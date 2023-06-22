import { Injectable } from '@nestjs/common';
import { BlockchainUtil } from '../../common/utils';
import { Command, TokenCommandPayload } from '../../dtos/chaincode/token/command';

@Injectable()
export class CChainService {
  constructor(private blockchainUtil: BlockchainUtil) { }

  async getStatus(): Promise<string> {
    const ccPath: string = `${process.env.BC_HLF_URL}/api/hlf-gw/cc/channel/chaincode/GetHealth`;
    const params = {};

    const retData = await this.blockchainUtil.sendGetRequestToHLF(
      ccPath,
      params
    );
    const resDTO = JSON.parse(retData.data.result);

    return resDTO;
  }

  async ImportToken(): Promise<any> {
    const ccPath: string = `${process.env.BC_HLF_URL}/api/hlf-gw/cc/channel/chaincode/ImportToken`;
    const tokenModel: TokenCommandPayload = {
      name: "NAME",
      symbol: "SYM",
      coupon: "2",
      faceValue: "2",
      period: 1
    } ;

    const requestBody: Command = {
      name: 'ImportToken',
      payload: tokenModel,
    };

    const retData = await this.blockchainUtil.sendPostRequestToHLF(
      ccPath,
      requestBody
    );
    return 0;
  }
}