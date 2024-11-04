import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RampService } from './ramp.service';
import { OffRampReqDto } from './dto/off-ramp-req.dto';
import { OffRampResDto } from './dto/off-ramp-res.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtAuthGuard } from 'src/middlewere/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { OnRampReqDto } from './dto/on-ram-req.dto';
import { OnRampResDto } from './dto/on-ramp-res.dto';

@ApiTags('Ramp')
@Controller('ramp')
@UseGuards(JwtAuthGuard)
export class RampController {
  constructor(private readonly rampService: RampService) {}

  @Post('/offramp')
  async offRamp(
    @Request() { user }: { user: UserDto },
    @Body() req: OffRampReqDto,
  ): Promise<OffRampResDto> {
    return this.rampService.offRamp(user.id, req);
  }
  @Post('/onramp')
  async onRamp(
    @Request() { user }: { user: UserDto },
    @Body() req: OnRampReqDto,
  ): Promise<OnRampResDto> {
    return this.rampService.onRamp(user.id, req);
  }
}
