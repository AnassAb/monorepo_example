import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from './common/trpc/trpc.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [TrpcModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
