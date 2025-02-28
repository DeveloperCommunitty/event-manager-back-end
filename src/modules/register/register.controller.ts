import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { Public } from '../auth/skipAuth/skipAuth';

@ApiTags('Cadastrar')
@Controller('cadastro')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso.' })
  @ApiResponse({ status: 403, description: 'Email já está sendo usado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async createUser(@Body() body: RegisterDto) {
    return this.registerService.createUser(body);
  }
}
