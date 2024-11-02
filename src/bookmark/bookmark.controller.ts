import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';

@ApiTags('Bookmark')
@Controller('bookmark')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  @ApiOperation({ summary: 'Get a users bookmarked assets' })
  async getBookmarks(@Request() req): Promise<string[]> {
    const userId = req.user.id;
    return await this.bookmarkService.getBookmarks(userId);
  }

  @Post('/:id')
  @ApiOperation({ summary: 'Get a users bookmarked assets' })
  @ApiResponse({ status: 201, description: 'Returns void' })
  async bookmark(@Request() req, @Param('id') assetId: string) {
    const userId = req.user.id;
    return await this.bookmarkService.addBookmark(userId, assetId);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Get a users bookmarked assets' })
  @ApiResponse({ status: 204, description: 'Returns Void' })
  async delteBookmark(@Request() req, @Param('id') assetId: string) {
    const userId = req.user.id;
    return await this.bookmarkService.deleteBookmark(userId, assetId);
  }
}
