import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateInviteDto } from './create-invite.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { InviteStatus } from '@prisma/client';

export class UpdateInviteDto extends PartialType(CreateInviteDto) {
  @ApiProperty({
    description: 'Status do convite',
    enum: InviteStatus,
    enumName: 'InviteStatus',
    example: InviteStatus.ACEITO,
    required: false,
  })
  @IsEnum(InviteStatus)
  @IsOptional()
  status?: InviteStatus;
}