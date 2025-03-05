import { ApiProperty } from '@nestjs/swagger';
import { InviteStatus } from '@prisma/client';
import { IsOptional, IsUUID } from 'class-validator';

export class CreateInviteDto {
  @ApiProperty({
    description: 'ID do usuário que está enviando o convite',
    example: 'e99304cc-48ff-407e-a2d1-1625d51d3179',
  })
  @IsUUID()
  senderId: string;

  @IsUUID()
  @IsOptional()
  receiverId?: string;

  @ApiProperty({
    description: 'ID do evento ao qual o convite está associado',
    example: '867936a2-9b28-46ef-b591-a76c9df7e5d3',
  })
  @IsUUID()
  eventId: string;

  @IsUUID()
  @IsOptional()
  token?: string;

  @IsOptional()
  status?: InviteStatus;
}
