const ApplicationError = require('../libs/applicationError');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error('App level error occured: ', err); // eslint-disable-line no-console
    const strErr = JSON.stringify({
      error: true,
      reason: err.toString(),
    });
    ctx.status = err instanceof ApplicationError ? err.status : 500; // eslint-disable-line no-undef
    ctx.set('Content-Type', 'application/json');
    ctx.body = strErr;
  }
};
