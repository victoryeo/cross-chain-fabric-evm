import { Controller, Get } from '@nestjs/common';
import { CChainService } from './cchain.service';

@Controller('cchain')
export class CChainController {
  constructor(private cchainService: CChainService) {}

  @Get()
  ImportToken() {
    return this.cchainService.ImportToken();
  }
}
