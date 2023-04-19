import { Module } from '@nestjs/common';
import { CChainController } from './cchain.controller';
import { CChainService } from './cchain.service';

@Module({
  controllers: [CChainController],
  providers: [CChainService],
})

export class CChainModule {}
