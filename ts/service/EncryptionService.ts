
import * as Crypto from 'crypto';
import HashService from './hash/HashService';
import LocalHashService from './hash/LocalHashService';

class EncryptionService {

  private password: string;

  private hashService: HashService = new LocalHashService();

  constructor(password: string) {
    this.password = password;
  }

  public encrypt(secret: string): string {
    const cipher = Crypto.createCipher('aes256', this.password);
    return cipher.update(secret, 'utf8', 'hex') + cipher.final('hex');
  }

  public decrypt(secret: string): string {
    if (this.hashService.hasBeenUsed(secret)) {
      throw new Error('Secret already accessed');
    }
    this.hashService.expire(secret);
    const decipher = Crypto.createDecipher('aes256', this.password);
    return decipher.update(secret, 'hex', 'utf8') + decipher.final('utf8');
  }
}

export default EncryptionService;
