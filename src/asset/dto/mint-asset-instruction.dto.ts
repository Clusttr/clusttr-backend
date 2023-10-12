import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class MintInstructionDto {
    @IsNotEmpty()
    @ApiProperty({
        description: "Asset Address",
        example: "A3eR#Address"
    })
    readonly assetAddress: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Number of asset to mint",
        example: "33"
    })
    readonly amount: number

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "private String",
    })
    readonly privateKey: string

}