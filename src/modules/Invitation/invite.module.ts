import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [InviteController],
  providers: [InviteService, PrismaService, MailService],
})
export class InvitesModule {}
