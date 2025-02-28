import { ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(body: RegisterDto) {
    const emailCheck = await this.prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (emailCheck) {
      throw new ForbiddenException('Email já está sendo usado');
    } else {
      const ramdomSalt = randomInt(10, 16);
      const hash = await bcrypt.hash(body.password, ramdomSalt);

      const cadastro = await this.prisma.user.create({
        data: {
          ...body,
          password: hash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return cadastro;
    }
  }
}
