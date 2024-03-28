import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class DowntownService {
    private readonly logger = new Logger(DowntownService.name)

    @Cron(CronExpression.EVERY_5_SECONDS)
    handleCron() {
        this.logger.debug('Called every 5 sec');
    }
}