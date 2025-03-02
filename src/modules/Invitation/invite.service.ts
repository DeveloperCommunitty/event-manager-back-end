import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { InviteStatus } from '@prisma/client';

@Injectable()
export class InviteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInviteDto: CreateInviteDto) {
    try {
      const invite = await this.prisma.invite.create({
        data: {
          status: createInviteDto.status || InviteStatus.PENDENTE,
          senderId: createInviteDto.senderId,
          receiverId: createInviteDto.receiverId,
          eventId: createInviteDto.eventId,
        },
      });

      return invite;
    } catch (error) {
      throw new HttpException(
        'Erro ao criar convite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const invites = await this.prisma.invite.findMany({
        include: {
          sender: true,
          receiver: true,
          event: true,
        },
      });

      if (!invites || invites.length === 0) {
        throw new HttpException('Nenhum convite encontrado', HttpStatus.NOT_FOUND);
      }

      return invites;
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao listar convites',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    try {
      const invite = await this.prisma.invite.findUnique({
        where: { id },
        include: {
          sender: true,
          receiver: true,
          event: true,
        },
      });

      if (!invite) {
        throw new HttpException('Convite não encontrado', HttpStatus.NOT_FOUND);
      }

      return invite;
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar convite',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateInviteDto: UpdateInviteDto) {
    try {
      const inviteCheck = await this.prisma.invite.findUnique({ where: { id } });

      if (!inviteCheck) {
        throw new HttpException('Convite não encontrado', HttpStatus.NOT_FOUND);
      }

      const updatedInvite = await this.prisma.invite.update({
        where: { id },
        data: updateInviteDto,
      });

      return updatedInvite;
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao atualizar convite',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      const inviteCheck = await this.prisma.invite.findUnique({ where: { id } });

      if (!inviteCheck) {
        throw new HttpException('Convite não encontrado', HttpStatus.NOT_FOUND);
      }

      await this.prisma.invite.delete({ where: { id } });

      return {
        message: 'Convite deletado com sucesso',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao deletar convite',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  async findSentInvites(senderId: string) {
    try {
      const invites = await this.prisma.invite.findMany({
        where: { senderId },
        include: {
          receiver: true,
          event: true,
        },
      });

      if (!invites || invites.length === 0) {
        throw new HttpException(
          'Nenhum convite enviado encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      return invites;
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao listar convites enviados',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findReceivedInvites(receiverId: string) {
    try {
      const invites = await this.prisma.invite.findMany({
        where: { receiverId },
        include: {
          sender: true,
          event: true,
        },
      });

      if (!invites || invites.length === 0) {
        throw new HttpException(
          'Nenhum convite recebido encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      return invites;
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao listar convites recebidos',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateStatus(id: string, status: InviteStatus) {
    try {
      const inviteCheck = await this.prisma.invite.findUnique({ where: { id } });

      if (!inviteCheck) {
        throw new HttpException('Convite não encontrado', HttpStatus.NOT_FOUND);
      }

      const updatedInvite = await this.prisma.invite.update({
        where: { id },
        data: { status },
      });

      return updatedInvite;
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao atualizar status do convite',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}