import { Module } from '@nestjs/common';
import { DbProvider } from './db.provider';

@Module({
  providers: [DbProvider],
  exports: [DbProvider], // make it available to other modules
})
export class DbModule {}
