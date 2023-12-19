import { Transport, ClientProxyFactory } from '@nestjs/microservices';

const USER_FACTORY = {
  provide: 'USER_SERVICE',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8081,
      },
    });
  },
};

export { USER_FACTORY };
