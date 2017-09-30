module.exports = async (ctx, next) => {
  const startTime = new Date();
  await next();
  ctx.responseTime = new Date() - startTime;
};
