import { Controller, Get, Body, Param, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Evento')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth('access_token')
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.create(createEventDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth('access_token')
  async findAll() {
    return await this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiBearerAuth('access_token')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return await this.eventService.update(id, updateEventDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth('access_token')
  async remove(@Param('id') id: string) {
    return await this.eventService.remove(id);
  }
}
