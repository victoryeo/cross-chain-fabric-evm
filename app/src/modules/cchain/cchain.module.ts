import { Module } from '@nestjs/common';
import { CChainController } from './cchain.controller';
import { CChainService } from './cchain.service';
import { BlockchainUtil } from '../../common/utils';

@Module({
  controllers: [CChainController],
  providers: [CChainService, BlockchainUtil],
})

export class CChainModule {}
