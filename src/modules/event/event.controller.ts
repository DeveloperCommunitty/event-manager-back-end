import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { EventService } from './event.service';

@ApiTags('Evento')
@Controller('evento')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Criar eventos' })
  @ApiResponse({
    status: 201,
    description: 'Evento criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro ao criar evento.' })
  @ApiResponse({ status: 404, description: 'Nenhum usuario encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.create(createEventDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Lista eventos' })
  @ApiResponse({
    status: 200,
    description: 'Eventos listados com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro ao listar eventos.' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async findAll() {
    return await this.eventService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Lista eventos ID' })
  @ApiResponse({
    status: 200,
    description: 'Eventos listados com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro ao listar evento.' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Lista convites enviados por um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Evento atualizado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar evento.' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return await this.eventService.update(id, updateEventDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Lista convites enviados por um usuário' })
  @ApiResponse({
    status: 204,
    description: 'Evento deletado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro ao deletar evento.' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async remove(@Param('id') id: string) {
    return await this.eventService.remove(id);
  }
}
