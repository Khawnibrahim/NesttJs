import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AiModule } from './ai/ai.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { ClientModule } from './client/client.module';
import { DeveloperModule } from './developer/developer.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    DbModule,
    AiModule,
    ConversationsModule,
    MessagesModule,
    ClientModule,
    DeveloperModule,
  ],
  controllers:[],
  providers: [],
})
export class AppModule {}
