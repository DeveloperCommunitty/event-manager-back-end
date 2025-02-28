import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    description: 'O Email do usuário',
    example: 'usuario@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'usuario123',
  })
  password: string;
}
