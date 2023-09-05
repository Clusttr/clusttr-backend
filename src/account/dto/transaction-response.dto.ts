import { ApiProperty } from "@nestjs/swagger"

export class TransactionResponseDto {
    @ApiProperty({ description: 'The JWT token', example: 'your-token-value' })
    success: boolean

    @ApiProperty({ description: 'Transaction Signature', example: 'xcvs12r56ui768' })
    signature: string
}