import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService], // 🔴 THIS LINE IS NON-NEGOTIABLE
})
export class MessagesModule {}
