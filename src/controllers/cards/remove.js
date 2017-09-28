module.exports = async (ctx) => {
    await ctx.cardsModel.remove(ctx.params.id); 
    ctx.body = "OK";
}