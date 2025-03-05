import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Invite, InviteStatus } from '@prisma/client';
import * as crypto from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateInviteDto } from './dto/create-invite.dto';

@Injectable()
export class InviteService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async create(createInviteDto: CreateInviteDto) {
    try {
      const { senderId, eventId } = createInviteDto;

      const users = await this.prisma.user.findMany({
        where: { id: { not: senderId } },
        select: { id: true, email: true, name: true },
      });

      const frontEndUrl = this.configService.get<string>('FRONT_END');

      const invites: { invite: Invite; inviteLink: string }[] = [];

      for (const user of users) {
        const token = crypto.randomBytes(32).toString('hex');

        const invite = await this.prisma.invite.create({
          data: {
            status: InviteStatus.PENDENTE,
            senderId,
            receiverId: user.id,
            eventId,
            token,
          },
        });

        const aceitarLink = `${frontEndUrl}/invite/aceitar/${token}`;
        const rejeitarLink = `${frontEndUrl}/invite/recusar/${token}`;

        await this.mailService.sendInvite(user.name, user.email, aceitarLink, rejeitarLink);

        invites.push({ invite, inviteLink: aceitarLink });
      }

      return { message: 'Convites enviados!', invites };
    } catch (error) {
      console.error(error);
      throw new HttpException('Erro ao criar convites', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async acceptInvite(token: string, userId: string) {
    try {
      const invite = await this.prisma.invite.findUnique({
        where: { token },
        include: { event: true },
      });

      if (!invite) {
        throw new HttpException('Convite inválido ou expirado', HttpStatus.NOT_FOUND);
      }

      if (invite.status !== InviteStatus.PENDENTE) {
        throw new HttpException('Convite já foi aceito ou recusado', HttpStatus.BAD_REQUEST);
      }

      const updatedInvite = await this.prisma.invite.update({
        where: { token },
        data: {
          status: InviteStatus.ACEITO,
          receiverId: userId,
        },
      });

      await this.prisma.participant.create({
        data: {
          userId,
          eventId: invite.eventId,
        },
      });

      return { message: 'Convite aceito!', invite: updatedInvite };
    } catch (error) {
      throw new HttpException(error.message || 'Erro ao aceitar convite', HttpStatus.BAD_REQUEST);
    }
  }

  async rejectInvite(token: string, userId: string) {
    try {
      const invite = await this.prisma.invite.findUnique({
        where: { token },
      });

      if (!invite) {
        throw new HttpException('Convite inválido ou expirado', HttpStatus.NOT_FOUND);
      }

      if (invite.status !== InviteStatus.PENDENTE) {
        throw new HttpException('Convite já foi aceito ou recusado', HttpStatus.BAD_REQUEST);
      }

      const updatedInvite = await this.prisma.invite.update({
        where: { token },
        data: {
          status: InviteStatus.RECUSADO,
          receiverId: userId,
        },
      });

      return { message: 'Convite recusado!', invite: updatedInvite };
    } catch (error) {
      throw new HttpException(error.message || 'Erro ao recusar convite', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const invites = await this.prisma.invite.findMany({
        include: { sender: true, receiver: true, event: true },
      });

      if (!invites.length) {
        throw new HttpException('Nenhum convite encontrado', HttpStatus.NOT_FOUND);
      }

      return invites;
    } catch (error) {
      throw new HttpException('Erro ao listar convites', HttpStatus.BAD_REQUEST);
    }
  }

  async findSentInvites(senderId: string) {
    try {
      const invites = await this.prisma.invite.findMany({
        where: { senderId },
        include: { receiver: true, event: true },
      });

      if (!invites.length) {
        throw new HttpException('Nenhum convite enviado encontrado', HttpStatus.NOT_FOUND);
      }

      return invites;
    } catch (error) {
      throw new HttpException('Erro ao listar convites enviados', HttpStatus.BAD_REQUEST);
    }
  }
}
