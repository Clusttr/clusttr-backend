import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schemas';

@Injectable()
export class BookmarkService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getBookmarks(userId: string): Promise<string[]> {
    const user = await this.userModel.findById(userId);
    return user.bookmarks;
  }

  async addBookmark(userId: string, assetId: string) {
    const user = await this.userModel.findById(userId);
    try {
      const _ = await this.userModel.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            bookmarks: assetId,
          },
        },
      );
      return assetId;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteBookmark(userId: string, assetId: string) {
    const user = await this.userModel.findById(userId);
    try {
      const _ = await this.userModel.findOneAndUpdate(
        { _id: userId },
        {
          $pullAll: {
            bookmarks: [assetId],
          },
        },
      );
      return assetId;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
