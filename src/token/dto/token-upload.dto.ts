import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class TokenUploadDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Asset Address",
    })
    readonly token: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Create Public Key",
    })
    readonly creator: string
}