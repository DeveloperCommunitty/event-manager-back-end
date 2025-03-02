import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsOptional } from 'class-validator';
import { InviteStatus } from '@prisma/client';

export class CreateInviteDto {
  @ApiProperty({
    description: 'ID do usuário que está enviando o convite',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  senderId: string;

  @ApiProperty({
    description: 'ID do usuário que está recebendo o convite',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  receiverId: string;

  @ApiProperty({
    description: 'ID do evento ao qual o convite está associado',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  @IsUUID()
  eventId: string;

  @ApiProperty({
    description: 'Status do convite',
    enum: InviteStatus,
    enumName: 'InviteStatus',
    example: InviteStatus.PENDENTE,
    required: false,
  })
  @IsEnum(InviteStatus)
  @IsOptional()
  status?: InviteStatus;
}