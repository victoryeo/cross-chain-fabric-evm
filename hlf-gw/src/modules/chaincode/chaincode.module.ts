import { Module, HttpModule } from '@nestjs/common';
import { ChaincodeController } from './chaincode.controller';
import { ChaincodeService } from './chaincode.service';

@Module({
  imports: [HttpModule],
  controllers: [ChaincodeController],
  providers: [ChaincodeService],
})
export class ChaincodeModule {}
