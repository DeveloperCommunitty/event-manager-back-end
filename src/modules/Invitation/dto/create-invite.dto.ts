import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsOptional } from 'class-validator';
import { InviteStatus } from '@prisma/client';

export class CreateInviteDto {
  @ApiProperty({
    description: 'ID do usuário que está enviando o convite',
    example: '49fadddb-e13d-4cef-93bb-7238978bd54a',
  })
  @IsUUID()
  senderId: string;

  @ApiProperty({
    description: 'ID do usuário que está recebendo o convite',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  @IsOptional()
  receiverId?: string;

  @ApiProperty({
    description: 'ID do evento ao qual o convite está associado',
    example: 'cfe69aad-b341-49e5-bb92-1efedcd88b1e',
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
