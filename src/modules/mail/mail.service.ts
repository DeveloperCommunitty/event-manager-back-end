import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendInvite(name: string, email: string, acceptLink: string, rejectLink: string) {
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('EMAIL_USER'),
        to: email,
        subject: 'Convite Especial: Participe do Nosso Evento!',
        text: `Olá, ${name}! Você foi convidado para um evento exclusivo. 
        Clique no link abaixo para confirmar sua presença ou recusar o convite:
        - Aceitar: ${acceptLink}
        - Recusar: ${rejectLink}`,
        html: `
              <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
                <h2>🎉 Você foi convidado para um evento especial! 🎉</h2>
                <p><strong style="font-size: 20px;">Olá, ${name}!</strong></p>
                <p>Você foi convidado para um evento exclusivo. Escolha uma opção abaixo:</p>

                <div style="margin: 20px 0;">
                  <a href="${acceptLink}" 
                    style="display: inline-block; background-color:rgb(30, 133, 54); color: #fff; 
                    padding: 12px 24px; text-decoration: none; border-radius: 5px; 
                    font-size: 16px; font-weight: bold; margin: 10px;">
                    ✅ Aceitar Convite
                  </a>

                  <a href="${rejectLink}" 
                    style="display: inline-block; background-color:rgb(182, 23, 39); color: #fff; 
                    padding: 12px 24px; text-decoration: none; border-radius: 5px; 
                    font-size: 16px; font-weight: bold; margin: 10px;">
                    ❌ Recusar Convite
                  </a>
                </div>

                <p>Se os botões não funcionarem, copie e cole um dos links abaixo no seu navegador:</p>
                <p><strong>Aceitar:</strong> <a href="${acceptLink}">${acceptLink}</a></p>
                <p><strong>Recusar:</strong> <a href="${rejectLink}">${rejectLink}</a></p>

                <p>Esperamos vê-lo lá! 🚀</p>
              </div>
            `,
      });
    } catch (error) {
      console.error(`Erro ao enviar e-mail para ${email}:`, error);
    }
  }
}
