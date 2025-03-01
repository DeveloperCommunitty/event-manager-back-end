import { Controller, Get, Body, Param, Delete, Post, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';

  
  @Controller('events')
  export class EventController {
    constructor(private readonly eventService: EventService) {}
  
    @Post()
    async create(@Body() createEventDto: CreateEventDto) {
      return await this.eventService.create(createEventDto);
    }
  
    @Get()
    async findAll() {
      return await this.eventService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.eventService.findOne(id);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
      return await this.eventService.update(id, updateEventDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return await this.eventService.remove(id);
    }
  }