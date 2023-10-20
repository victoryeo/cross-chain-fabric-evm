import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`PORT ${process.env.PORT_NO}`)
  await app.listen(process.env.PORT_NO || 3000);
}
bootstrap();
