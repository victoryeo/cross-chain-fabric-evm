import { Controller, Get } from '@nestjs/common';

@Controller('healthy')
export class HealthController {
  @Get()
  getHealthCheck() {
    return 'healthy';
  }
}
