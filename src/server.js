require('dotenv').config();

const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./routes');
const log = require('./logger')(__filename);
const { config } = require('./config');

const app = new Koa();

app.use(koaBody());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, () => log.info(`Server is listening on port ${config.port}`));

process.on('SIGINT', async () => {
  process.exit(1);
});
