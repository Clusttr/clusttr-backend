import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class TokenDto {
    @IsNotEmpty()
    @ApiProperty({
        description: "Id",
    })
    readonly id: string

    @IsNotEmpty()
    @ApiProperty({
        description: "Asset Address",
    })
    readonly token: string

    @IsNotEmpty()
    @ApiProperty({
        description: "Create Public Key",
    })
    readonly creator: string

}