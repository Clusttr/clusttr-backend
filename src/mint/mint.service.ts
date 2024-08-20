import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MintModule } from './mint.module';

@Injectable()
export class MintService {
  constructor() {} //(@InjectModel(MintService.name) private mintModel: MintModule) {}
}
