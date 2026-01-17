import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { messages } from './message.schema';
import { InferModel, eq, asc } from 'drizzle-orm';
import { ReplyMessageDto } from '../developer/dto/reply-message.dto';
import { SendMessageDto } from '../client/dto/send-message.dto';

// TypeScript types
export type Message = InferModel<typeof messages>;
export type NewMessage = InferModel<typeof messages, 'insert'>;

@Injectable()
export class MessagesService {
  private db;

  constructor() {
    // Connect to Supabase/Postgres
    const sql = postgres(process.env.DATABASE_URL!, {
      ssl: { rejectUnauthorized: false }, // required for Supabase
    });

    this.db = drizzle(sql);
  }

  // -------------------------------
  // 1️⃣ Client sends a message
  // -------------------------------
  async sendClientMessage(dto: SendMessageDto, conversationId: string) {
    const newMsg: NewMessage = {
      conversationId,
      senderType: 'client',
      originalContent: dto.message,
      maskedContent: dto.message,
    };

    const result = await this.db.insert(messages).values(newMsg).returning();
    return result[0];
  }

  // -------------------------------
  // 2️⃣ Developer sends a reply
  // -------------------------------
  async sendDeveloperReply(dto: ReplyMessageDto, conversationId: string) {
    const newMsg: NewMessage = {
      conversationId,
      senderType: 'developer',
      originalContent: dto.message,
      maskedContent: dto.message, // you can apply masking/validation later
    };

    const result = await this.db.insert(messages).values(newMsg).returning();
    return result[0];
  }

  // -------------------------------
  // 3️⃣ Get all messages for a conversation
  // -------------------------------
  async getMessages(conversationId: string) {
    return await this.db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(asc(messages.createdAt));
  }
}
