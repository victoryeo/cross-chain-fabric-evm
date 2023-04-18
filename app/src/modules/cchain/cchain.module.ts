import { Module } from '@nestjs/common';
import { CChainController } from './cchain.controller';

@Module({
  controllers: [CChainController],
})

export class CChainModule {}
