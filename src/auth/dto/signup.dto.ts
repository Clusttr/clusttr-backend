import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class SignUpDto {
    @IsOptional()
    @IsString()
    @ApiProperty({description: "user's handle", example: "jack"})
    readonly name: string

    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter correct email"})
    @ApiProperty({description: "user's email", example: "jack@gmail.com"})
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({description: "user's password", example: "abc123"})
    readonly password: string
}