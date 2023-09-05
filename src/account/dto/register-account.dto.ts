import { ApiProperty } from "@nestjs/swagger";

export class RegisterAccountDto {
    @ApiProperty({ description: 'Secret', example: 'xcvs12r56ui768' })
    secret: string
}