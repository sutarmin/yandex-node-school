module.exports = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
        console.error('App level error occured: ', err);
        const strErr = JSON.stringify({
            error: true, 
            reason: err.toString()
        });
        ctx.status = err instanceof ApplicationError ? err.status : 500;
        ctx.set("Content-Type", "application/json")
		ctx.body = strErr;
	}
};