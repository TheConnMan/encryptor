import * as Crypto from 'crypto';

class EncryptionService {

  private password: string;

  constructor(password: string) {
    this.password = password;
  }

  public encrypt(secret: string): string {
    const cipher = Crypto.createCipher('aes256', this.password);
    return cipher.update(secret, 'utf8', 'hex') + cipher.final('hex');
  }

  public decrypt(secret: string): string {
    const decipher = Crypto.createDecipher('aes256', this.password);
    return decipher.update(secret, 'hex', 'utf8') + decipher.final('utf8');
  }
}

export default EncryptionService;
