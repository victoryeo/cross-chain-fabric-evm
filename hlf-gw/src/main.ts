import { NestFactory } from '@nestjs/core';
import Express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const server = Express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    cors: true,
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use(morgan('combined'));
  app.enableCors();
  app.setGlobalPrefix('api/fabric-client');

  console.log(`PORT ${process.env.PORT_NO}`)
  const server2 = await app.listen(process.env.PORT_NO || 3000);

  server2.setTimeout(600000); // Timeout is 10 minutes
}
bootstrap();
