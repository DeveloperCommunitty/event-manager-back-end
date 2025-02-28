import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'Usuário Example Name',
  })
  name?: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'usuario123',
  })
  password?: string;
}
