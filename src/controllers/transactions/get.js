module.exports = async (ctx) => {
    ctx.body = await ctx.transactionsModel.getByCardId(ctx.params.id);
}