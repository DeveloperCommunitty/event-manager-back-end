import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InviteStatus } from '@prisma/client';

@ApiTags('Convite')
@Controller('convite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Cria um novo convite' })
  @ApiResponse({ status: 201, description: 'Convite criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao criar convite.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async create(@Body() createInviteDto: CreateInviteDto) {
    return await this.inviteService.create(createInviteDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Lista todos os convites' })
  @ApiResponse({ status: 200, description: 'Convites listados com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao listar convites.' })
  @ApiResponse({ status: 404, description: 'Nenhum convite encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async findAll() {
    return await this.inviteService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Lista um convite por id' })
  @ApiResponse({ status: 200, description: 'Convite listado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao listar convite.' })
  @ApiResponse({ status: 404, description: 'Convite não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async findOne(@Param('id') id: string) {
    return await this.inviteService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um convite por id' })
  @ApiResponse({ status: 200, description: 'Convite atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar convite.' })
  @ApiResponse({ status: 404, description: 'Convite não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async update(@Param('id') id: string, @Body() updateInviteDto: UpdateInviteDto) {
    return await this.inviteService.update(id, updateInviteDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um convite por id' })
  @ApiResponse({ status: 204, description: 'Convite deletado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao deletar convite.' })
  @ApiResponse({ status: 404, description: 'Convite não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async remove(@Param('id') id: string) {
    return await this.inviteService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Get('sent/:senderId')
  @ApiOperation({ summary: 'Lista convites enviados por um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Convites enviados listados com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro ao listar convites enviados.' })
  @ApiResponse({ status: 404, description: 'Nenhum convite encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async findSentInvites(@Param('senderId') senderId: string) {
    return await this.inviteService.findSentInvites(senderId);
  }

  @UseGuards(AuthGuard)
  @Get('received/:receiverId')
  @ApiOperation({ summary: 'Lista convites recebidos por um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Convites recebidos listados com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro ao listar convites recebidos.' })
  @ApiResponse({ status: 404, description: 'Nenhum convite encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async findReceivedInvites(@Param('receiverId') receiverId: string) {
    return await this.inviteService.findReceivedInvites(receiverId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualiza o status de um convite' })
  @ApiResponse({
    status: 200,
    description: 'Status do convite atualizado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar status.' })
  @ApiResponse({ status: 404, description: 'Convite não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async updateStatus(@Param('id') id: string, @Query('status') status: InviteStatus) {
    return await this.inviteService.updateStatus(id, status);
  }
}
