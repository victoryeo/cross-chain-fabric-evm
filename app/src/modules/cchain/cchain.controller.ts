import { Controller, Post } from '@nestjs/common';
import { CChainService } from './cchain.service';

@Controller('cchain')
export class CChainController {
  constructor(private cchainService: CChainService) {}

  @Post('import')
  ImportToken() {
    return this.cchainService.ImportToken();
  }
}
