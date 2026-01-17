import { Module } from '@nestjs/common';
import { DeveloperController } from './developer.controller';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [MessagesModule], // ✅ REQUIRED
  controllers: [DeveloperController],
})
export class DeveloperModule {}
