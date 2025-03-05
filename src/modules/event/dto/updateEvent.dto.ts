import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty({
    description: 'Nome do Evento',
    example: 'Tech Conference 2025',
  })
  nameEvent: string;

  @ApiProperty({
    description: 'Descrição do Evento',
    example: 'Um evento imperdível para desenvolvedores e entusiastas de tecnologia.',
  })
  description: string;

  @ApiProperty({
    description: 'Latitude do Evento',
    example: -23.55052,
  })
  latitude: number;

  @ApiProperty({
    description: 'Longitude do Evento',
    example: -46.633308,
  })
  longitude: number;

  @ApiProperty({
    description: 'Data do Evento',
    example: '2025-03-02T04:12:44.977Z',
  })
  dateTime: Date;
}
