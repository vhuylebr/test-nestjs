import { Module } from '@nestjs/common';
import { JustifyController } from './controlers/justify/justify.controller';
import { JustifyService } from './controlers/justify/justify.service';
import { TokenController } from './controlers/token/token.controller';
import { AuthService } from './commonServices/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './commonServices/auth/constants';
import { JwtStrategy } from './commonServices/auth/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [JustifyController, TokenController],
  providers: [JustifyService, AuthService, JwtStrategy],
})
export class AppModule {}
