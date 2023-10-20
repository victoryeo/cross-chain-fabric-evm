import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { CChainModule } from './modules/cchain/cchain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    HealthModule,
    CChainModule
   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
