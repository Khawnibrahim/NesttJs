import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [MessagesModule], // ✅ REQUIRED
  controllers: [ClientController],
})
export class ClientModule {}
