import { ServiceUnavailableException } from '@nestjs/common';
import { ScalexResDto } from './dto/ScalexRes.dto';
import { ScalexBankResDto } from './dto/ScalexBankRes.dto';
import { ScalexAccountDetailsResDto } from './dto/scalex-account-details-res.dto';
import { ScalexExchangeRateResDto } from './dto/scalex-exchange-rate-res.dto';
import { ScalexOffRampResDto } from './dto/scalex-off-ramp-res.dto';
import { ScalexOffRampReqDto } from './dto/scalex-off-ramp-req.dto';
import { ScalexOnRampReqDto } from './dto/scalex-on-ramp-req.dto';
import { ScalexOnRampResDto } from './dto/scalex-on-ramp-res.dto';

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

  async getExchangeRate(
    token: string,
    currency: string,
  ): Promise<ScalexExchangeRateResDto> {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.scalexPrivateKey}`);

    const requestOptions = {
      method: 'GET',
      headers: headers,
      redirct: 'follow',
    };

    const res = await fetch(
      `${ScalexServices.BASE_URL}/business/rates?token=${token}&network=BEP20&currency=${currency}`,
      requestOptions,
    );

    if (!res.ok) {
      throw new ServiceUnavailableException(
        'Failed to get banks at the moment',
      );
    }

    const jsonData: ScalexResDto<ScalexExchangeRateResDto> = await res.json();
    return jsonData.data;
  }

  async offRamp(req: ScalexOffRampReqDto): Promise<ScalexOffRampResDto> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.scalexPrivateKey}`);

    const raw = JSON.stringify(req);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirct: 'follow',
    };

    const res = await fetch(
      `${ScalexServices.BASE_URL}/business/tx/offramp`,
      requestOptions,
    );

    const jsonData: ScalexResDto<ScalexOffRampResDto> = await res.json();
    if (!res.ok) throw new ServiceUnavailableException(jsonData.message);
    return jsonData.data;
  }

  async onRamp(req: ScalexOnRampReqDto): Promise<ScalexOnRampResDto> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.scalexPrivateKey}`);

    console.log({ req });
    const raw = JSON.stringify(req);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirct: 'follow',
    };

    const res = await fetch(
      `${ScalexServices.BASE_URL}/business/tx/onramp`,
      requestOptions,
    );

    const jsonData: ScalexResDto<ScalexOnRampResDto> = await res.json();
    if (!res.ok) throw new ServiceUnavailableException(jsonData.message);
    return jsonData.data;
  }
}
