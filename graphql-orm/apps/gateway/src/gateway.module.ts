import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          // 각각의 subGraph 를 하나로 연결 시켜준다.
          subgraphs: [
            {
              name: 'account',
              url: 'http://localhost:3001/graphql',
            },
            {
              name: 'talk',
              url: 'http://localhost:3002/graphql',
            },
          ],
        }),
      },
    }),
  ],
  providers: [GatewayService],
})
export class GatewayModule {}
