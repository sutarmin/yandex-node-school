module.exports = async (ctx, next) => {
    ctx.cardsModel = new CardsModel();
    ctx.transactionsModel = new TransactionsModel();

    await Promise.all([
            ctx.cardsModel.loadFile(),
            ctx.transactionsModel.loadFile()
    ]);

    await next();
}