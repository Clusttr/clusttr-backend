import { Module } from "@nestjs/common";
import { DowntownService } from "./downtown.service";
import { DowntownController } from "./downtown.controller";

@Module({
    controllers: [DowntownController],
    providers: [DowntownService]
})
export class DowntownModule {}