import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtService } from './jwt/jwt.service';
import { AuthController } from './auth/auth.controller';
import { DevicesController } from './devices/devices.controller';
import { UserEntity } from './users/entities/user.entity';
import { JwtMiddleware } from './common/middleware/jwt.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'iotplatform',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // set to false in production
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController, AuthController, DevicesController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude('/auth/login', '/auth/register')
      .forRoutes('/*');
  }
}