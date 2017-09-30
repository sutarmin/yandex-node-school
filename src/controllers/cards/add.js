module.exports = async (ctx) => {
  ctx.body = await ctx.cardsModel.create(ctx.request.body);
};
