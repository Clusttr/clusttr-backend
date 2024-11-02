import { ServiceUnavailableException } from '@nestjs/common';
import { ScalexResDto } from './dto/ScalexRes.dto';
import { ScalexBankResDto } from './dto/ScalexBankRes.dto';
import { ScalexAccountDetailsResDto } from './dto/scalex-account-details-res.dto';

export class ScalexServices {
  constructor(private scalexPrivateKey: string) {}
  static BASE_URL = 'https://ramp.scalex.africa';

  async fetchBanksFromScaleX(): Promise<Array<ScalexBankResDto>> {
    const header = new Headers();
    header.append('Authorization', `Bearer ${this.scalexPrivateKey}`);
    const requestOption = {
      method: 'GET',
      headers: header,
      redirct: 'follow',
    };

    const res = await fetch(
      `${ScalexServices.BASE_URL}/business/banks`,
      requestOption,
    );
    if (!res.ok) {
      throw new ServiceUnavailableException(
        'Failed to get banks at the moment',
      );
    }
    const jsonData: ScalexResDto<{ banks: Array<ScalexBankResDto> }> =
      await res.json();
    return jsonData.data.banks;
  }

  async getAccountDetails(
    accountNumber: string,
    bankCode: string,
  ): Promise<ScalexAccountDetailsResDto> {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${this.scalexPrivateKey}`);

    const raw = JSON.stringify({
      account_number: accountNumber,
      bank_code: bankCode,
    });

    const requestOption = {
      method: 'POST',
      headers: header,
      body: raw,
      redirct: 'follow',
    };

    const requestOptions = {
      method: 'POST',
      headers: header,
      body: raw,
      redirct: 'follow',
    };

    const res = await fetch(
      `${ScalexServices.BASE_URL}/business/bank/resolve`,
      requestOptions,
    );

    if (!res.ok)
      throw new ServiceUnavailableException(
        'Failed to get bank account details at the moment',
      );

    const jsonData: ScalexResDto<ScalexAccountDetailsResDto> = await res.json();
    return jsonData.data;
  }
}
