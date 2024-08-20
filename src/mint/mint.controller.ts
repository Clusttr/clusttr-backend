import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MintService } from './mint.service';

@ApiTags('mint')
@Controller('mint')
export class MintController {
  constructor(private readonly mintService: MintService) {}
}
