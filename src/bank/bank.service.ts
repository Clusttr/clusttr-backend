import { Injectable } from '@nestjs/common';
import { ScalexServices } from 'src/service/ramps/ScalexServices';
import { BankQueryDto } from 'src/bank/dto/bank-query.dto';
import { BankResDto } from 'src/bank/dto/bank-res.dto';
import { Bank } from './schema/bank.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateBanksResDto } from './dto/update-banks-res.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BankService {
  constructor(
    @InjectModel(Bank.name) private bankModel: Model<Bank>,
    private readonly scalexService: ScalexServices,
  ) {}

  async findOne(id: string): Promise<BankResDto> {
    return await this.bankModel.findById(id);
  }

  async findAll(query: BankQueryDto): Promise<Array<BankResDto>> {
    let name = new RegExp(query.name, 'i');
    let code = new RegExp(query.code, 'i');
    let result = await this.bankModel.find({
      name,
      code,
    });
    console.log('Here');
    return result.map((x) => ({
      id: x._id.toString(),
      name: x.name,
      code: x.code,
    }));
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async update(): Promise<UpdateBanksResDto> {
    let banks = await this.scalexService.fetchBanksFromScaleX();

    let banksSchema: Array<Bank> = banks.map((x) => {
      let bank = new Bank();
      bank.name = x.name;
      bank.code = x.code;
      return bank;
    });

    let result = await this.bankModel.bulkWrite(
      banksSchema.map((x) => ({
        updateMany: {
          filter: { name: x.name },
          update: { $set: x },
          upsert: true,
        },
      })),
    );

    return { numberOfBanksUpdated: result.upsertedCount };
  }

  async remove(id: string): Promise<Boolean> {
    let result = await this.bankModel.deleteOne({ _id: id });
    return true;
  }
}
