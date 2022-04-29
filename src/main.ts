import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { CustomRpcExceptionFilter } from './exception-filters/custom-rpc.exception-filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        persistent: true,
        queue: 'main_queue',
        prefetchCount: 1,
        //noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.listen();
}
bootstrap();
