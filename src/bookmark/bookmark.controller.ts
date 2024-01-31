import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '@src/user/decorators';
import { Response } from 'express';
import { AuthGuard } from '@src/auth/auth.guard';
import { BookmarkDto } from './dto/bookmark-dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @GetUser('id') userId: number,
    @Body() bookmarkDto: BookmarkDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const new_bookmark = await this.bookmarkService.create(bookmarkDto, userId);
    return res.status(201).send({
      success: true,
      message: 'Bookmark created successfully',
      bookmark: new_bookmark,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  async update(
    @Body() bookmarkDto: BookmarkDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const updated_bookmark = await this.bookmarkService.update(bookmarkDto);
    return res.status(201).send({
      success: true,
      message: `Bookmark id ${bookmarkDto.id!} updated successfully!`,
      bookmark: updated_bookmark,
    });
  }

  @UseGuards(AuthGuard)
  @Get('find/:id')
  async findOne(
    @GetUser('id') userId: number,
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const bookmark = await this.bookmarkService.findOne(id);
    return res.status(200).send({
      success: true,
      message: `Bookmark id ${id} fetched successfully!`,
      bookmark: bookmark,
    });
  }

  @UseGuards(AuthGuard)
  @Get('find')
  async find(
    @GetUser('id') userId: number,
    @Query('user_id') user_id: number,
    @Query('title') title: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    let bookmarks;
    if (title && user_id) {
      bookmarks = await this.bookmarkService.find({
        title,
        userId: user_id,
      });
    } else if (title) {
      bookmarks = await this.bookmarkService.find({
        title,
        userId,
      });
    } else if (user_id) {
      bookmarks = await this.bookmarkService.find({
        userId: user_id,
      });
    } else {
      bookmarks = await this.bookmarkService.find({
        userId,
      });
    }
    return res.status(200).send({
      success: true,
      message: `Bookmarks fetched successfully!`,
      bookmarks,
    });
  }
}
