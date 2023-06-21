import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ChaincodeTransactionResult,
  ChaincodeTransactionSubmissionModel,  
} from 'src/dtos/models';
import { ChaincodeService } from './chaincode.service';

@Controller('cc')
export class ChaincodeController {
  constructor(private chaincodeService: ChaincodeService) {}

  @Get(':channelName/:chaincodeName/:func')
  async queryTransaction(
    @Param('channelName') channelName: string,
    @Param('func') func: string,
    @Param('chaincodeName') chaincodeName: string,
    @Query('params') params: string = ''
  ): Promise<ChaincodeTransactionResult> {
    return this.chaincodeService.queryTransaction(
      func,
      params,
      channelName,
      chaincodeName
    );
  }

  @Post(':channelName/:chaincodeName/:func')
  async submitTransaction(
    @Param('channelName') channelName: string,
    @Param('chaincodeName') chaincodeName: string,
    @Param('func') func: string,
    @Body() request: ChaincodeTransactionSubmissionModel
  ): Promise<ChaincodeTransactionResult> {
    return this.chaincodeService.submitTransaction(
      func,
      request,
      channelName,
      chaincodeName
    );
  }
}
