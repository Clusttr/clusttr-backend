import { ForbiddenException, Injectable } from '@nestjs/common';
import { WaitlistDto } from './dto/waitlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Waitlist } from './schemas/waitlist.module';
import { Model } from 'mongoose';

@Injectable()
export class WaitlistService {
    constructor(@InjectModel(Waitlist.name) private waitlistModel: Model<Waitlist>) {}

    async register(person: WaitlistDto): Promise<WaitlistDto> {
        try {
            await this.waitlistModel.create({email: person.email})
            return person
        } catch (error) {
            throw new ForbiddenException('Credentails taken');
        }
    }

    async getWaitlist(page: number, size: number): Promise<WaitlistDto[]> {
        try {
            const waitlist = await this.waitlistModel.find<Waitlist>({}).limit(size).skip((page -1) * size)
            const waitlistDto = waitlist.map((item) => ({email: item.email}))
            return waitlistDto
        } catch (error) {
            throw new ForbiddenException('Failed to fetch waitlist data');
        }
    }
} 
