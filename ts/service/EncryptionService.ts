import RedisHashService from './hash/RedisHashService';

import * as Crypto from 'crypto';
import HashService from './hash/HashService';
import LocalHashService from './hash/LocalHashService';

class EncryptionService {

  private password: string;

  private hashService: HashService;

  constructor(password: string) {
    this.password = password;
    if (process.env.REDIS_HOST) {
      this.hashService = new RedisHashService(
        process.env.REDIS_HOST,
        parseInt(process.env.REDIS_PORT || '6379', 10),
        process.env.REDIS_PASSWORD
      );
    } else {
      this.hashService = new LocalHashService();
    }
  }

  public encrypt(secret: string): string {
    const cipher = Crypto.createCipher('aes256', this.password);
    const encrypted = cipher.update(secret, 'utf8', 'hex') + cipher.final('hex');
    this.hashService.clear(encrypted);
    return encrypted;
  }

  public async decrypt(secret: string): Promise<string> {
    const hasBeenUsed = await this.hashService.hasBeenUsed(secret);
    if (hasBeenUsed) {
      throw new Error('Secret already accessed');
    }
    this.hashService.expire(secret);
    const decipher = Crypto.createDecipher('aes256', this.password);
    return decipher.update(secret, 'hex', 'utf8') + decipher.final('utf8');
  }
}

export default EncryptionService;
