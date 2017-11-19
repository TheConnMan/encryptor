import * as Crypto from 'crypto';

abstract class HashService {

  public abstract hasBeenUsed(encrypted: string): Promise<boolean>;

  public abstract expire(encrypted: string): void;

  public abstract clear(encrypted: string): void;

  protected getHash(encrypted: string): string {
    const hasher = Crypto.createHash('sha256');
    return hasher.update(encrypted).digest('hex');
  }
}

export default HashService;
