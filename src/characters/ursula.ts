import axios from 'axios';
import { PolicyMessageKit } from '../crypto/kits';
import { Arrangement } from '../policies/policy';
import { ChecksumAddress } from '../types';
import { IUrsula } from './porter';

export abstract class Ursula {
  public static proposeArrangement(
    ursula: IUrsula,
    arrangement: Arrangement
  ): ChecksumAddress | null {
    const url = `https://${ursula.uri}/consider_arrangement`;
    axios.post(url, arrangement.toBytes()).catch(() => {
      return null;
    });
    return ursula.checksumAddress;
  }

  public static enactPolicy(
    ursula: IUrsula,
    arrangementId: Buffer,
    messageKit: PolicyMessageKit
  ) {
    const kFragId = arrangementId.toString('hex');
    const url = `https://${ursula.uri}/kFrag/${kFragId}`;
    axios.post(url, messageKit.toBytes()).catch(() => {
      return null;
    });
    return ursula.checksumAddress;
  }
}
