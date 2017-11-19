import HashService from './HashService';

class LocalHashService extends HashService {

  private usedHashes: Set<string> = new Set();

  public hasBeenUsed(encrypted: string): Promise<boolean> {
    return Promise.resolve(this.usedHashes.has(this.getHash(encrypted)));
  }

  public expire(encrypted: string): void {
    this.usedHashes.add(this.getHash(encrypted));
  }

  public clear(encrypted: string): void {
    this.usedHashes.delete(this.getHash(encrypted));
  }
}

export default LocalHashService;
