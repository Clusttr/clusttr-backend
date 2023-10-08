import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class MintInstructionDto {
    @IsNotEmpty()
    @ApiProperty({
        description: "Asset Address",
        example: "A3eR#Address"
    })
    readonly assetAddress: string

    @IsNotEmpty()
    @ApiProperty({
        description: "Developer public address",
        example: "33"
    })
    readonly receiverAddress: string

    @IsNotEmpty()
    @ApiProperty({
        description: "Number of asset to mint",
        example: "33"
    })
    readonly amount: number

}