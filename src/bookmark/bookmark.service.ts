import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { BookmarkDto } from './dto/bookmark-dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(bookmarkDto: BookmarkDto, userId: number) {
    try {
      if (bookmarkDto.description) {
        return await this.prisma.bookmark.create({
          data: {
            title: bookmarkDto.title,
            link: bookmarkDto.link,
            description: bookmarkDto.description,
            userId,
          },
        });
      } else {
        return await this.prisma.bookmark.create({
          data: {
            title: bookmarkDto.title,
            link: bookmarkDto.link,
            description: bookmarkDto.description,
            userId,
          },
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async update(bookmarkDto: BookmarkDto) {
    try {
      if (!bookmarkDto.description) {
        const updated_bookmark = await this.prisma.bookmark.update({
          where: {
            id: bookmarkDto.id,
          },
          data: {
            title: bookmarkDto.title,
            link: bookmarkDto.link,
          },
        });
        return updated_bookmark;
      } else {
        const updated_bookmark = await this.prisma.bookmark.update({
          where: {
            id: bookmarkDto.id,
          },
          data: {
            title: bookmarkDto.title,
            link: bookmarkDto.link,
            description: bookmarkDto.description,
          },
        });
        return updated_bookmark;
      }
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async find({ title, userId }: { title?: string; userId?: number }) {
    try {
      if (title && userId) {
        return await this.prisma.bookmark.findMany({
          where: {
            title: {
              contains: title,
            },
            userId,
          },
        });
      } else if (title) {
        return await this.prisma.bookmark.findMany({
          where: {
            title: {
              contains: title,
            },
          },
        });
      } else if (userId) {
        return await this.prisma.bookmark.findMany({
          where: {
            userId,
          },
        });
      } else {
        return await this.prisma.bookmark.findMany();
      }
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async delete(id: number) {
    try {
      const deleted_bookmark = await this.prisma.bookmark.delete({
        where: {
          id: parseInt(`${id}`),
        },
      });

      return deleted_bookmark;
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async findOne(id: number) {
    try {
      console.log({
        id,
      });

      const bookmark = await this.prisma.bookmark.findUnique({
        where: {
          id: parseInt(`${id}`),
        },
      });
      return bookmark;
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async findByUserId(userId: number) {
    try {
      const bookmarks = await this.prisma.bookmark.findMany({
        where: {
          userId,
        },
      });
      return bookmarks;
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }
}
