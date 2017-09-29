module.exports = async (ctx, next) => {
    const logRequest = `${ctx.method} on ${ctx.url}`;
    console.log(logRequest);
    await next();
    // ctx.responseTime - заполниется в обработчике timeMeasurement
    const logResponse = `\tTime: ${ctx.responseTime}ms. Status: ${ctx.status}`;
    console.log(logResponse);
};