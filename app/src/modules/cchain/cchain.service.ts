import { Injectable } from '@nestjs/common';
import { BlockchainUtil } from '../../common/utils';

@Injectable()
export class CChainService {
  constructor(private blockchainUtil: BlockchainUtil) { }

  async getStatus(): Promise<string> {
    const ccPath: string = `${process.env.BC_HLF_URL}/api/fabric-client/cc/health/chaincode/GetHealth`;
    const params = {};

    const retData = await this.blockchainUtil.sendGetRequestToHLF(
      ccPath,
      params
    );
    const resDTO = JSON.parse(retData.data.result);

    return resDTO;
  }

  async ImportToken(): Promise<any> {
    return 0;
  }
}