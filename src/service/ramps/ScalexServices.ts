import { ServiceUnavailableException } from '@nestjs/common';
import { ScalexResDto } from './dto/ScalexRes.dto';
import { ScalexBankResDto } from './dto/ScalexBankRes.dto';

export class ScalexServices {
  constructor(private scalexPrivateKey: string) {}
  async fetchBanksFromScaleX(): Promise<Array<ScalexBankResDto>> {
    const header = new Headers();
    header.append('Authorization', `Bearer ${this.scalexPrivateKey}`);
    const requestOption = {
      method: 'GET',
      headers: header,
      redirct: 'follow',
    };

    const res = await fetch(
      'https://ramp.scalex.africa/business/banks',
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
}
