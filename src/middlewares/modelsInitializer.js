const CardsModel = require('../models/cardsModel');
const TransactionsModel = require('../models/transactionsModel');

module.exports = async (ctx, next) => {
  ctx.cardsModel = new CardsModel(); // eslint-disable-line no-undef
  ctx.transactionsModel = new TransactionsModel(); // eslint-disable-line no-undef

  await Promise.all([
    ctx.cardsModel.loadFile(),
    ctx.transactionsModel.loadFile(),
  ]);

  await next();
};
