import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
@Module({
  imports: [BoardModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}