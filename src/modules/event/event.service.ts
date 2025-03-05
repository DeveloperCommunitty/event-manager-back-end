import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: createEventDto.ownerId },
      });

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      const event = await this.prisma.event.create({
        data: {
          nameEvent: createEventDto.nameEvent,
          description: createEventDto.description,
          latitude: createEventDto.latitude,
          longitude: createEventDto.longitude,
          dateTime: createEventDto.dateTime,
          ownerId: createEventDto.ownerId,
        },
      });

      return event;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const events = await this.prisma.event.findMany({
        include: {
          owner: true,
          participants: true,
          invites: true,
        },
      });

      if (!events || events.length === 0) {
        throw new HttpException('Nenhum evento encontrado', HttpStatus.NOT_FOUND);
      }

      return events;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id },
        include: {
          owner: true,
          participants: {
            include: {
              user: true,
            },
          },
          invites: {
            include: {
              sender: true,
              receiver: true,
            },
          },
          _count: true,
        },
      });

      if (!event) {
        throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
      }

      return event;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id },
      });

      if (!event) {
        throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
      }

      const updatedEvent = await this.prisma.event.update({
        where: { id },
        data: {
          nameEvent: updateEventDto.nameEvent,
          description: updateEventDto.description,
          latitude: updateEventDto.latitude,
          longitude: updateEventDto.longitude,
          dateTime: updateEventDto.dateTime,
        },
      });

      return updatedEvent;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id },
        include: { invites: true, participants: true },
      });

      if (!event) {
        throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
      }

      await this.prisma.event.delete({
        where: { id },
      });

      return {
        message: 'Evento deletado com sucesso',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
