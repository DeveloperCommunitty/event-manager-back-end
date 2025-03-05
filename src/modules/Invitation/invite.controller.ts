import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthUser } from 'src/interface/AuthUser';
import { AuthGuard } from '../auth/auth.guard';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InviteService } from './invite.service';

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
  @Get('enviado/:senderId')
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
  @Patch('aceitar/:token')
  @ApiOperation({ summary: 'Aceitar convites enviados para eventos' })
  @ApiResponse({
    status: 200,
    description: 'Convites aceito com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro ao Aceitar convite.' })
  @ApiResponse({ status: 404, description: 'Convite inválido ou expirado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async acceptInvite(@Param('token') token: string, @CurrentUser() user: AuthUser) {
    return this.inviteService.acceptInvite(token, user.id);
  }

  @UseGuards(AuthGuard)
  @Patch('recusar/:token')
  @ApiOperation({ summary: 'Recusar convites enviados para eventos' })
  @ApiResponse({
    status: 200,
    description: 'Convites recusar com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro ao Recusar convite.' })
  @ApiResponse({ status: 404, description: 'Convite inválido ou expirado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  async rejectInvite(@Param('token') token: string, @CurrentUser() user: AuthUser) {
    return this.inviteService.rejectInvite(token, user.id);
  }
}
