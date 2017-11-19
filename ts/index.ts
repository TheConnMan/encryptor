import EncryptionService from './service/EncryptionService';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as log4js from 'log4js';

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'info'
    }
  }
} as log4js.Configuration);
const logger = log4js.getLogger();
logger.level = 'info';

const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
const password = process.env.ENCRYPTION_KEY;

if (!password) {
  throw new Error('Encryption key is required');
}

const encryptionService = new EncryptionService(password);

const app = express();
app.use(bodyParser.text());
app.use(log4js.connectLogger(logger, {
  level: 'debug'
}));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/create', (req, res) => {
  res.send(`${serverUrl}/secret/${encryptionService.encrypt(req.body)}`);
});

app.get('/secret/:text', (req, res) => {
  encryptionService.decrypt(req.params.text).then((text) => {
    res.send(text);
  }).catch((err: Error) => {
    res.status(401).send(err.message);
  });
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => {
  logger.info('Started app on port 3000');
});
