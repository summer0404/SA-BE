// rmq-client.config.ts
import { ClientProxyFactory, Transport, RmqOptions, ClientProxy } from '@nestjs/microservices';

export const createRmqClient = (queue: string): ClientProxy => {
  return ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue,
      queueOptions: {
        durable: true,
      },
    },
  } as RmqOptions); 
};
