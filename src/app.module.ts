import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { RegisterModule } from './modules/register/register.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { InvitesModule } from './modules/Invitation/invite.module';
@Module({
  imports: [UserModule, RegisterModule, AuthModule, InvitesModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
