import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'Usuário Example Name',
  })
  name: string;

  @ApiProperty({
    description: 'O email do usuário',
    example: 'usuario@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'usuario123',
  })
  password: string;
}
