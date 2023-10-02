import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WaitlistDto } from './dto/waitlist.dto';
import { WaitlistService } from './waitlist.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('waitlist')
@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post('register')
  register(@Body() person: WaitlistDto): void {
    this.waitlistService.register(person);
  }

  @Get()
  async getWaitlist(
    @Param('page') page: number,
    @Param('size') size: number,
  ): Promise<WaitlistDto[]> {
    return this.waitlistService.getWaitlist(page, size);
  }
}
