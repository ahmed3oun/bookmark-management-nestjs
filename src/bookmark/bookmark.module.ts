import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';

@Module({
  imports: [],
  controllers: [BookmarkController],
  providers: [BookmarkService],
  exports: []
})
export class BookmarkModule {}