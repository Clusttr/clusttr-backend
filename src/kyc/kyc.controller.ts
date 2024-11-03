import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { KycService } from './kyc.service';
import { CreateKycDto } from './dto/create-kyc.dto';
import { UpdateKycDto } from './dto/update-kyc.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { QueryKycDto } from './dto/query-kyc.dto';

@ApiTags('KYC')
@Controller('kyc')
@UseGuards(JwtAuthGuard)
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Post()
  create(
    @Request() { user }: { user: UserDto },
    @Body() createKycDto: CreateKycDto,
  ) {
    return this.kycService.create(user.id, createKycDto);
  }

  @Get()
  findAll(@Query() query: QueryKycDto) {
    return this.kycService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kycService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKycDto: UpdateKycDto) {
    return this.kycService.update(id, updateKycDto);
  }

  @Delete(':id')
  remove(@Request() { user }: { user: UserDto }, @Param('id') id: string) {
    return this.kycService.remove(user.id, id);
  }
}
