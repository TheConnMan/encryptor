import * as IORedis from 'ioredis';
import HashService from './HashService';

const REDIS_PREFIX = 'encryptor:';

class RedisHashService extends HashService {

  private redis: IORedis.Redis;

  constructor(host: string, port: number, password: string) {
    super();
    this.redis = new IORedis({
      port,
      host,
      password
    });
  }

  public hasBeenUsed(encrypted: string): Promise<boolean> {
    return this.redis.exists(REDIS_PREFIX + this.getHash(encrypted));
  }

  public expire(encrypted: string): void {
    this.redis.set(REDIS_PREFIX + this.getHash(encrypted), true);
  }
}

export default RedisHashService;
