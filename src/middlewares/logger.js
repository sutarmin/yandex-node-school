module.exports = async (ctx, next) => {
  const logRequest = `${ctx.method} on ${ctx.url}`;
  // eslint-disable-next-line no-console
  console.log(logRequest);
  await next();
  // ctx.responseTime - заполняется в обработчике timeMeasurement
  const logResponse = `\tTime: ${ctx.responseTime}ms. Status: ${ctx.status}`;
  // eslint-disable-next-line no-console
  console.log(logResponse);
};
