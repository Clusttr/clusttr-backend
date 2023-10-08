import { ApiProperty } from "@nestjs/swagger";
import { AccountType } from "../schemas/user.schemas";
import { IsNotEmpty } from "class-validator";

export class UpdateUserRoleDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'accountType',
        example: '0',
        required: true
      })
    readonly accountType: AccountType
}