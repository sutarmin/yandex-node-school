module.exports = async (ctx) => {
    ctx.request.body.cardId = ctx.params.id;
    ctx.body = await ctx.transactionsModel.create(ctx.request.body);
}