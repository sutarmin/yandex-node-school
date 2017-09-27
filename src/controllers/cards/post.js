const CardsModel = require("../../models/cardsModel");

module.exports = async (ctx) => {
    ctx.body = await new CardsModel().create();
}