# Encryptor

Non-persistent secret sharing

## Usage

### Setup

```
git clone https://github.com/TheConnMan/encryptor.git
cd encryptor
npm install
ENCRYPTION_KEY=<password> npm start
```

### Secrets

Create a secret URL:

```
curl -X POST http://localhost:3000/create -d 'my super secret text'
// http://localhost:3000/secret/<encrypted-secret>
```

Use the secret URL:
```
curl -X GET http://localhost:3000/secret/<encrypted-secret>
```

## Redis

By default **Encryptor** uses a local, in-memory store to track if URLs have been accessed before. This is not durable meaning URLs can be decrypted again after use if **Encryptor** is restarted. To prevent this Redis can be used as a datastore using the Redis environment variables. [Redis Labs](https://app.redislabs.com) offers a free tier which you can use.

## Environment Variables
- **ENCRYPTION_KEY** - Encryption key used to encrypt secrets
- **SERVER_URL** (default: http://localhost:3000) - Full server URL used when generating links
- **REDIS_HOST** (Optional) - Redis host URL
- **REDIS_PORT** (default: 6379) - Redis port
- **REDIS_PASSWORD** (Optional) - Redis password
