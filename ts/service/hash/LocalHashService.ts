import HashService from './HashService';

class LocalHashService extends HashService {

  private usedHashes: string[] = [];

  public hasBeenUsed(encrypted: string): Promise<boolean> {
    return Promise.resolve(this.usedHashes.indexOf(this.getHash(encrypted)) !== -1);
  }

  public expire(encrypted: string): void {
    this.usedHashes.push(this.getHash(encrypted));
  }
}

export default LocalHashService;
